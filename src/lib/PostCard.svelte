<script lang="ts">
  import type {Event} from 'nostr-tools'
  import {getTag, getSlug, getPublishedAt, formatDate, readingTime} from './nostr'

  export let post: Event
  export let featured = false

  const title = getTag(post, 'title') || 'Untitled'
  const summary = getTag(post, 'summary')
  const href = `/p/${encodeURIComponent(getSlug(post))}`

  let image = getTag(post, 'image')
</script>

<a {href} class="group block">
  <div
    class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 via-rose-100 to-sky-100 dark:from-stone-800 dark:via-stone-800 dark:to-stone-700 shadow-sm group-hover:shadow-xl transition-shadow duration-300 {featured
      ? 'aspect-[2/1]'
      : 'aspect-video'}">
    {#if image}
      <img
        src={image}
        alt=""
        loading={featured ? 'eager' : 'lazy'}
        on:error={() => (image = undefined)}
        class="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
    {:else}
      <span
        class="absolute inset-0 flex items-center justify-center font-serif text-7xl text-stone-900/10 dark:text-white/10 select-none">
        {title[0]}
      </span>
    {/if}
    {#if featured}
      <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div class="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white">
        <p class="text-xs uppercase tracking-widest text-white/70">Latest</p>
        <h2 class="mt-2 font-serif text-3xl sm:text-5xl leading-tight tracking-tight">{title}</h2>
        {#if summary}
          <p class="mt-3 max-w-2xl text-white/85 line-clamp-2 hidden sm:block">{summary}</p>
        {/if}
        <p class="mt-4 text-sm text-white/70">
          {formatDate(getPublishedAt(post))} · {readingTime(post.content)} min read
        </p>
      </div>
    {/if}
  </div>
  {#if !featured}
    <p class="mt-4 text-xs uppercase tracking-widest text-stone-500">
      {formatDate(getPublishedAt(post))} · {readingTime(post.content)} min read
    </p>
    <h2 class="mt-2 font-serif text-2xl leading-snug group-hover:text-accent transition-colors">
      {title}
    </h2>
    {#if summary}
      <p class="mt-2 text-stone-600 dark:text-stone-400 line-clamp-3">{summary}</p>
    {/if}
  {/if}
</a>
