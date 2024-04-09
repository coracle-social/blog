<script lang="ts">
  import {sortBy, uniqBy} from '@coracle.social/lib'
  import {getIdOrAddress, getIdAndAddress} from '@coracle.social/util'
  import {subscribe} from '@coracle.social/network'
  import PostItem from './lib/PostItem.svelte'
  import Post from './lib/Post.svelte'

  const postId = window.location.pathname.match(/\/p\/(.+)/)?.[1]
  const pubkey = '97c70a44366a6535c145b333f973ea86dfdc2d7a99da618c40c64705ad98e322'

  let post
  let posts = []

  const timeout = new Promise(r => setTimeout(r, 2000))

  const sub = subscribe({
    relays: ['wss://relay.damus.io', 'wss://hodlbod.coracle.tools'],
    filters: [{kinds: [30023], authors: [pubkey]}],
  })

  sub.emitter.on('event', (url, e) => {
    posts = uniqBy(getIdOrAddress, sortBy(e => -e.created_at, posts.concat(e)))
    post = posts.find(e => getIdAndAddress(e).includes(postId))
  })
</script>

<div>
  <nav class="py-4 px-6">
    <div class="max-w-2xl m-auto flex justify-between items-center">
      {#if postId}
        <a href="/">Home</a>
      {:else}
        <span />
      {/if}
      <h1 class="text-xl">Hodlbod's Blog</h1>
    </div>
  </nav>
  <main class="flex flex-col gap-4 max-w-2xl m-auto">
    {#if post}
      <Post {post} />
    {:else if postId}
      {#await timeout}
        <p>Loading...</p>
      {:then}
        <p>Unable to find that post.</p>
      {/await}
    {:else}
      {#each posts as post}
        <PostItem {post} />
      {/each}
    {/if}
  </main>
</div>
