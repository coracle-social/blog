<script lang="ts">
  import {getIdAndAddress} from '@coracle.social/util'
  import {author, posts, loading, postId, navigate, loadBlog} from './lib/state'
  import {AUTHOR, displayProfile, getSlug, getTag} from './lib/nostr'
  import Header from './lib/Header.svelte'
  import PostList from './lib/PostList.svelte'
  import Post from './lib/Post.svelte'

  loadBlog()

  // Client-side navigation for internal links
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a')

    if (!a || a.target || a.origin !== window.location.origin) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return

    e.preventDefault()
    navigate(a.pathname)
  }

  $: name = displayProfile($author.profile, AUTHOR)
  $: post = $postId
    ? $posts.find(e => getSlug(e) === $postId || getIdAndAddress(e).includes($postId))
    : undefined
  $: document.title = post ? `${getTag(post, 'title') || 'Untitled'} · ${name}` : name
</script>

<svelte:window on:click={onClick} />

<div class="min-h-screen flex flex-col">
  <Header compact={Boolean($postId)} />
  <main class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-20">
    {#if post}
      {#key post.id}
        <Post {post} />
      {/key}
    {:else if $postId}
      {#if $loading}
        <div class="max-w-2xl mx-auto mt-16 space-y-4 animate-pulse">
          <div class="h-10 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
          <div class="h-4 w-1/3 rounded bg-stone-200 dark:bg-stone-800" />
          <div class="aspect-[2/1] rounded-2xl bg-stone-200 dark:bg-stone-800" />
        </div>
      {:else}
        <div class="text-center mt-24">
          <p class="font-serif text-2xl">This post couldn't be found.</p>
          <a href="/" class="inline-block mt-4 text-accent hover:underline">← Back to all posts</a>
        </div>
      {/if}
    {:else}
      <PostList posts={$posts} loading={$loading} />
    {/if}
  </main>
  <footer class="border-t border-stone-200 dark:border-stone-800 py-8 text-center text-sm text-stone-500">
    Published on <a class="underline hover:text-accent" href="https://nostr.com" target="_blank" rel="noreferrer">nostr</a>
  </footer>
</div>
