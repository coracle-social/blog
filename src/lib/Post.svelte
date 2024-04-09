<script lang="ts">
  import insane from "insane"
  import {marked} from "marked"
  import {nip19} from 'nostr-tools'
  import {fromNostrURI} from "@coracle.social/util"
  import {subscribe} from "@coracle.social/network"

  export let post

  const {title, summary} = Object.fromEntries(post.tags)
  const pubkeys = new Map()

  export const getLocale = () => new Intl.DateTimeFormat().resolvedOptions().locale

  export const formatTimestampAsDate = (ts: number) => {
    const formatter = new Intl.DateTimeFormat(getLocale(), {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    return formatter.format(new Date(ts * 1000))
  }

  const parseEntity = uri => {
    const entity = fromNostrURI(uri)

    let type, data

    try {
      ;({type, data} = nip19.decode(entity) as {type: string; data: any})
    } catch (e) {}

    return type ? {type, data} : null
  }

  const loadPubkey = (pubkey, relays = []) => {
    const sub = subscribe({
      filters: [{authors: [pubkey], kinds: [0]}],
      relays: relays.concat(['wss://purplepag.es', 'wss://relay.damus.io', 'wss://relay.nostr.band']),
    })

    sub.emitter.on('event', (url, e) => {
      try {
        const content = JSON.parse(e.content)

        pubkeys.set(e.pubkey, content.name || content.display_name)
      } catch (e) {}

      html = renderMarkdown()
    })
  }

  const renderMarkdown = () => {
    const regex = /(nostr:)?n(event|ote|pub|profile|addr)\w{10,1000}/g

    let markdown = post.content
    for (const uri of post.content.match(regex) || []) {
      const entity = parseEntity(uri)

      let display = uri.slice(0, 16) + "..."
      if (entity?.type === "npub" && pubkeys.has(entity.data.pubkey)) {
        display = "@" + pubkeys.get(entity.data)
      } else if (entity?.type === "nprofile" && pubkeys.has(entity.data.pubkey)) {
        display = "@" + pubkeys.get(entity.data.pubkey)
      }

      markdown = markdown.replace(uri, `[${display}](https://coracle.social/${uri})`)
    }

    return insane(marked.parse(markdown))
  }

  let html = renderMarkdown()

  for (const uri of post.content.match(/(nostr:)?n(pub|profile)\w{10,1000}/g) || []) {
    const entity = parseEntity(uri)

    if (entity?.type === "npub") {
      loadPubkey(entity.data)
    }

    if (entity?.type === "nprofile") {
      loadPubkey(entity.data.pubkey, entity.data.relays)
    }
  }
</script>

<div>
  <h3 class="text-3xl mt-4">{title}</h3>
  <span class="text-gray-600 text-sm">{formatTimestampAsDate(post.created_at)}</span>
</div>
<div class="long-form-content flex flex-col gap-4 overflow-hidden text-ellipsis leading-6">
  {@html html}
</div>
