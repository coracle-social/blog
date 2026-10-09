<script lang="ts">
  import type {Event} from 'nostr-tools'
  import insane from 'insane'
  import {marked} from 'marked'
  import {nip19} from 'nostr-tools'
  import {fromNostrURI} from '@coracle.social/util'
  import {author} from './state'
  import {
    AUTHOR,
    displayProfile,
    loadAuthor,
    getTag,
    getSlug,
    getPublishedAt,
    formatDate,
    readingTime,
  } from './nostr'

  export let post: Event

  const title = getTag(post, 'title') || 'Untitled'
  const summary = getTag(post, 'summary')
  const topics = post.tags.filter(t => t[0] === 't').map(t => t[1])
  const entityRegex = /(nostr:)?n(event|ote|pub|profile|addr)1[02-9ac-hj-np-z]+/g

  let image = getTag(post, 'image')
  let names: Record<string, string> = {}

  const decode = (uri: string) => {
    try {
      return nip19.decode(fromNostrURI(uri))
    } catch (e) {
      return null
    }
  }

  const getMentionedPubkey = (entity: ReturnType<typeof decode>) => {
    if (entity?.type === 'npub') return {pubkey: entity.data, relays: []}
    if (entity?.type === 'nprofile') return {pubkey: entity.data.pubkey, relays: entity.data.relays || []}
  }

  const render = (content: string, names: Record<string, string>) => {
    const markdown = content.replace(entityRegex, (uri, _, __, offset) => {
      const url = `https://coracle.social/${fromNostrURI(uri)}`
      const before = content[offset - 1]

      // Already a link target, or part of a longer url
      if (before === '(') return url
      if (before === '/') return uri

      const pubkey = getMentionedPubkey(decode(uri))?.pubkey
      const display = pubkey && names[pubkey] ? `@${names[pubkey]}` : fromNostrURI(uri).slice(0, 16) + '…'

      return `[${display}](${url})`
    })

    return insane(marked.parse(markdown) as string)
  }

  for (const uri of post.content.match(entityRegex) || []) {
    const mention = getMentionedPubkey(decode(uri))

    if (mention && !names[mention.pubkey]) {
      loadAuthor(mention.pubkey, mention.relays).then(({profile}) => {
        names = {...names, [mention.pubkey]: displayProfile(profile, mention.pubkey)}
      })
    }
  }

  $: html = render(post.content, names)
  $: name = displayProfile($author.profile, AUTHOR)
  $: discussUrl =
    'https://coracle.social/' +
    nip19.naddrEncode({
      kind: post.kind,
      pubkey: post.pubkey,
      identifier: getSlug(post),
      relays: $author.relays.slice(0, 3),
    })
</script>

<article class="mt-6 sm:mt-12">
  <header class="max-w-2xl mx-auto text-center">
    {#if topics.length > 0}
      <div class="flex flex-wrap justify-center gap-2 mb-5">
        {#each topics.slice(0, 4) as topic}
          <span class="text-xs uppercase tracking-widest text-accent">#{topic}</span>
        {/each}
      </div>
    {/if}
    <h1 class="font-serif text-4xl sm:text-6xl leading-[1.1] tracking-tight">{title}</h1>
    {#if summary}
      <p class="mt-5 text-left text-base text-stone-600 dark:text-stone-400">{summary}</p>
    {/if}
    <div class="mt-6 flex items-center justify-center gap-3 text-sm text-stone-500">
      {#if $author.profile.picture}
        <img class="w-9 h-9 rounded-full object-cover" src={$author.profile.picture} alt="" />
      {/if}
      <div class="text-left">
        <div class="text-stone-900 dark:text-stone-100 font-medium">{name}</div>
        <div>{formatDate(getPublishedAt(post))} · {readingTime(post.content)} min read</div>
      </div>
    </div>
  </header>

  {#if image}
    <img
      src={image}
      alt=""
      on:error={() => (image = undefined)}
      class="mt-10 sm:mt-14 w-full max-h-[32rem] object-cover rounded-2xl shadow-lg" />
  {/if}

  <div
    class="prose prose-stone dark:prose-invert prose-lg max-w-2xl mx-auto mt-10 sm:mt-14 break-words
      prose-headings:font-serif prose-headings:font-normal prose-a:text-accent prose-img:rounded-xl">
    {@html html}
  </div>

  <div class="max-w-2xl mx-auto mt-16 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-wrap gap-4 justify-between items-center">
    <a href="/" class="text-stone-500 hover:text-accent transition-colors">← All posts</a>
    <a
      href={discussUrl}
      target="_blank"
      rel="noreferrer"
      class="px-4 py-2 rounded-full bg-accent text-white text-sm hover:opacity-90 transition-opacity">
      Discuss on Coracle
    </a>
  </div>
</article>
