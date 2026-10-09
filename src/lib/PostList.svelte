<script lang="ts">
  import type {Event} from 'nostr-tools'
  import PostCard from './PostCard.svelte'

  export let posts: Event[]
  export let loading: boolean

  $: [featured, ...rest] = posts
</script>

{#if featured}
  <div class="flex flex-col gap-12">
    <PostCard post={featured} featured />
    {#if rest.length > 0}
      <div class="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {#each rest as post (post.id)}
          <PostCard {post} />
        {/each}
      </div>
    {/if}
  </div>
{:else if loading}
  <div class="flex flex-col gap-12 animate-pulse">
    <div class="aspect-[2/1] rounded-2xl bg-stone-200 dark:bg-stone-800" />
    <div class="grid gap-8 sm:grid-cols-2">
      {#each [1, 2] as _}
        <div class="space-y-3">
          <div class="aspect-video rounded-2xl bg-stone-200 dark:bg-stone-800" />
          <div class="h-6 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
          <div class="h-4 w-full rounded bg-stone-200 dark:bg-stone-800" />
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p class="text-center font-serif text-2xl mt-16">No posts yet.</p>
{/if}
