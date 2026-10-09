import type {Event} from 'nostr-tools'
import type {Filter} from '@coracle.social/util'
import {nip19} from 'nostr-tools'
import {sortBy, uniq} from '@coracle.social/lib'
import {normalizeRelayUrl, isShareableRelayUrl} from '@coracle.social/util'
import {subscribe} from '@coracle.social/network'

export const AUTHOR = '97c70a44366a6535c145b333f973ea86dfdc2d7a99da618c40c64705ad98e322'

// Indexers hold relay lists (kind 10002) and profiles (kind 0) for most pubkeys
export const INDEXER_RELAYS = ['wss://indexer.coracle.social/', 'wss://purplepag.es/']

export type Profile = {
  name?: string
  display_name?: string
  picture?: string
  about?: string
  website?: string
}

type LoadOpts = {
  relays: string[]
  filters: Filter[]
  timeout?: number
  onEvent?: (e: Event) => void
}

// Resolves once every relay has sent EOSE (or closed), or the timeout elapses
export const load = ({relays, filters, timeout = 4000, onEvent}: LoadOpts) =>
  new Promise<Event[]>(resolve => {
    const events: Event[] = []
    const finished = new Set<string>()
    const sub = subscribe({relays, filters, timeout})

    let done = false

    const finish = () => {
      if (done) return

      done = true
      sub.close()
      resolve(events)
    }

    const onFinished = (url: string) => {
      finished.add(url)

      if (relays.every(r => finished.has(r))) finish()
    }

    sub.emitter.on('event', (url: string, e: Event) => {
      events.push(e)
      onEvent?.(e)
    })

    sub.emitter.on('eose', onFinished)
    sub.emitter.on('close', onFinished)
    sub.emitter.on('complete', finish)
  })

const latest = (events: Event[]) => sortBy(e => -e.created_at, events)[0]

const normalizeRelays = (urls: string[]) =>
  uniq(urls.filter(isShareableRelayUrl).map(url => normalizeRelayUrl(url)))

// NIP-65: relays with no marker are both read and write relays
export const getWriteRelays = (relayList?: Event) =>
  normalizeRelays(
    (relayList?.tags || [])
      .filter(([k, url, mark]) => k === 'r' && url && (!mark || mark === 'write'))
      .map(t => t[1]),
  )

export const parseProfile = (event?: Event): Profile => {
  try {
    return JSON.parse(event?.content || '{}')
  } catch (e) {
    return {}
  }
}

export const displayProfile = (profile: Profile, pubkey: string) =>
  profile.display_name || profile.name || nip19.npubEncode(pubkey).slice(0, 12) + '…'

// Look up a pubkey's outbox relays via indexers plus any hints, falling back to those if none are found
export const loadOutbox = async (pubkey: string, hints: string[] = []) => {
  const indexers = normalizeRelays([...INDEXER_RELAYS, ...hints])
  const relayLists = await load({relays: indexers, filters: [{kinds: [10002], authors: [pubkey]}]})
  const writeRelays = getWriteRelays(latest(relayLists))

  return writeRelays.length > 0 ? writeRelays : indexers
}

export const loadProfile = async (pubkey: string, relays: string[]) => {
  const profiles = await load({
    relays: uniq([...relays, ...INDEXER_RELAYS]),
    filters: [{kinds: [0], authors: [pubkey]}],
  })

  return parseProfile(latest(profiles))
}

export const loadAuthor = async (pubkey: string, hints: string[] = []) => {
  const relays = await loadOutbox(pubkey, hints)

  return {pubkey, relays, profile: await loadProfile(pubkey, relays)}
}

export const getTag = (event: Event, key: string) => event.tags.find(t => t[0] === key)?.[1]

export const getPublishedAt = (event: Event) =>
  parseInt(getTag(event, 'published_at') || '') || event.created_at

export const getSlug = (event: Event) => getTag(event, 'd') || event.id

export const formatDate = (ts: number) =>
  new Intl.DateTimeFormat(undefined, {year: 'numeric', month: 'long', day: 'numeric'}).format(
    new Date(ts * 1000),
  )

export const readingTime = (content: string) =>
  Math.max(1, Math.round(content.split(/\s+/).length / 230))
