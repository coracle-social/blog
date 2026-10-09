<script lang="ts">
  import {nip19} from 'nostr-tools'
  import {author} from './state'
  import {AUTHOR, displayProfile} from './nostr'

  export let compact = false

  $: name = displayProfile($author.profile, AUTHOR)
  $: profileUrl =
    'https://coracle.social/' +
    nip19.nprofileEncode({pubkey: AUTHOR, relays: $author.relays.slice(0, 3)})
</script>

<header class="w-full max-w-5xl mx-auto px-4 sm:px-6">
  {#if compact}
    <nav class="flex items-center justify-between py-5">
      <a href="/" class="group flex items-center gap-3">
        {#if $author.profile.picture}
          <img class="w-8 h-8 rounded-full object-cover" src={$author.profile.picture} alt="" />
        {/if}
        <span class="font-serif text-lg group-hover:text-accent transition-colors">{name}</span>
      </a>
      <a href="/" class="text-sm text-stone-500 hover:text-accent transition-colors">← All posts</a>
    </nav>
  {:else}
    <div class="flex flex-col items-center text-center pt-16 pb-12">
      {#if $author.profile.picture}
        <img
          class="w-20 h-20 rounded-full object-cover ring-4 ring-white dark:ring-stone-900 shadow-lg"
          src={$author.profile.picture}
          alt="" />
      {:else}
        <div class="w-20 h-20 rounded-full bg-stone-200 dark:bg-stone-800 animate-pulse" />
      {/if}
      <h1 class="mt-5 font-serif text-4xl sm:text-5xl tracking-tight">{name}</h1>
      {#if $author.profile.about}
        <p class="mt-3 max-w-xl text-stone-600 dark:text-stone-400 line-clamp-3">
          {$author.profile.about}
        </p>
      {/if}
      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer"
        class="mt-5 text-sm px-4 py-1.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-accent hover:text-accent transition-colors">
        Follow on nostr
      </a>
    </div>
  {/if}
</header>
