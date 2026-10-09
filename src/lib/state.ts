import type {Event} from 'nostr-tools'
import {writable, derived} from 'svelte/store'
import {sortBy, uniqBy} from '@coracle.social/lib'
import {getIdOrAddress} from '@coracle.social/util'
import type {Profile} from './nostr'
import {AUTHOR, load, loadOutbox, loadProfile, getPublishedAt} from './nostr'

export const author = writable<{profile: Profile; relays: string[]}>({profile: {}, relays: []})

export const posts = writable<Event[]>([])

export const loading = writable(true)

export const path = writable(window.location.pathname)

export const postId = derived(path, $path => {
  const match = $path.match(/^\/p\/(.+)/)?.[1]

  return match ? decodeURIComponent(match) : undefined
})

export const navigate = (href: string) => {
  window.history.pushState({}, '', href)
  path.set(window.location.pathname)
  window.scrollTo(0, 0)
}

window.addEventListener('popstate', () => path.set(window.location.pathname))

const addPost = (e: Event) =>
  posts.update($posts =>
    // Replaceable events: keep only the newest version of each address
    sortBy(
      e => -getPublishedAt(e),
      uniqBy<Event>(getIdOrAddress, sortBy(e => -e.created_at, [...$posts, e])),
    ),
  )

// Outbox model: find out where the author publishes, then fetch posts from there
export const loadBlog = async () => {
  const relays = await loadOutbox(AUTHOR)

  author.update($author => ({...$author, relays}))

  loadProfile(AUTHOR, relays).then(profile => author.update($author => ({...$author, profile})))

  await load({relays, filters: [{kinds: [30023], authors: [AUTHOR]}], onEvent: addPost})

  loading.set(false)
}
