<script lang="ts">
  export let post

  const {title, summary} = Object.fromEntries(post.tags)
  const href = `/p/${post.id}`
</script>

<a
  class="flex flex-col gap-2 bg-gray-100 py-2 px-3 rounded-xl hover:shadow transition-all cursor-pointer"
  {href}>
  <div class="flex justify-between">
    <h3 class="text-2xl">{title}</h3>
    <a
      class="flex gap-2 items-center"
      href="https://coracle.social/nprofile1qyw8wumn8ghj76r0v3kxymmy9e3k7unpvdkx2tn5dahkcue0qyd8wumn8ghj7urewfsk66ty9enxjct5dfskvtnrdakj7qgewaehxw309a5x7ervvfhkgtnwdaehgu339e3k7mf0qqsf03c2gsmx5ef4c9zmxvlew04gdh7u94afnknp33qvv3c94kvwxgs9jmd2p"
      target="_blank"
      on:click|stopPropagation>
      <img class="w-6 h-6 rounded-full" src="https://i.nostr.build/AZ0L.jpg" />
      @hodlbod
    </a>
  </div>
  <p>{summary}</p>
</a>
