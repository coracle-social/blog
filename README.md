# Hodlbod's Blog

A small single-page blog that reads long-form posts ([NIP-23](https://github.com/nostr-protocol/nips/blob/master/23.md), kind `30023`) from nostr. There is no backend; the browser fetches posts directly from the author's relays.

## How it loads posts

The blog uses the outbox model ([NIP-65](https://github.com/nostr-protocol/nips/blob/master/65.md)). It asks the indexer relays `wss://indexer.coracle.social` and `wss://purplepag.es` for the author's relay list (kind `10002`), then fetches posts and the profile (kind `0`) from the relays the author writes to. An author without a relay list is read from the indexers.

Profiles of people mentioned in a post (`npub` or `nprofile`) are resolved the same way, including any relay hints in the `nprofile`.

Nostr code lives in `src/lib/nostr.ts`. App state and routing live in `src/lib/state.ts`.

## Pages

- `/` lists every post. The newest one is shown as a large banner card and the rest in a grid.
- `/p/<slug>` shows a single post. The slug is the post's `d` tag. Older links that use an event id or a `30023:<pubkey>:<d>` address still work.

Banner images come from the post's `image` tag. Dates come from `published_at`, or `created_at` if that tag is missing.

## Using it for another author

Set `AUTHOR` in `src/lib/nostr.ts` to the author's hex pubkey, and change the `<title>` in `index.html`. The header's name, avatar and bio come from the author's nostr profile.

## Development

```sh
pnpm install
pnpm dev    # http://localhost:8293
pnpm check  # svelte-check type checking
pnpm build  # static output in dist/
```

Built with Svelte 4, Vite, Tailwind (with `@tailwindcss/typography`), and the `@coracle.social` network libraries.

## Deploying

`dist/` is a static site. Because routing happens in the browser, the server has to send `index.html` for every path that isn't a file (for example `try_files $uri /index.html` in nginx).
