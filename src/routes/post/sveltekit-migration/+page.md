---
title: Changes in SvelteKit (#5748)
date: '2022-09-02'
description: 'Thoughts on the SvelteKit changes described in the discussion #5748'
tags:
  - 'svelte'
---

Though I'm a very happy SvelteKit user, using it before its official 1.0 release comes at a cost of refactoring frequently to support the latest changes.
One of the latest change was bigger than usual: [Fixing `load`, and tightening up SvelteKit's design before 1.0 #5748
](https://github.com/sveltejs/kit/discussions/5748)

I updated this blog in the commits [7518ef6](https://github.com/Mytakeon/gh-pages/commit/7518ef669293786281d44ac3fbb1a4d594980765) and [6f7c328](https://github.com/Mytakeon/gh-pages/commit/6f7c32811766822713ab7fe100b6087d292d64e4), by following the [migration guide](https://github.com/sveltejs/kit/discussions/5774).

## Changes in the routing

As with many other frameworks with file-based routing: a page in a SvelteKit application could previously be defined with a single file (`mypage.svelte`) or with a folder + an index file (`mypage/index.svelte`). Now, pages _must_ be named `+page.svelte`, meaning the example above becomes `mypage/+page.svelte`

Seeing this `+` prepending all the filenames is a little disturbing at first, but one gets used to it quickly. It enables users to put additional `.svelte` files in a route directory without it becoming a page, which is great.

I am not sure if it is preferable (if file system based routing in general, really) to alternatives; say perhaps a simple JS object, such as the ones we are accustomed to for our build tool configurations, for instance:

```js
const config = [{
    path: "/"
    endpoint: fetchIndex
    page: Index,
},
{
    path: "/[id]",
    validation: [id => /^\d+$/.test(id)]
    page: Post
}];
```

Although that requires a bit more code, it is arguably clearer since it is more explicit and doesn't require remembering the contract around how files should be named and where they should be placed.

It is good, I think, that SvelteKit stopped trying to do too much in the filename - for instance, it was possible at some point was to include route parameter validation (e.g. `user[id=integer].svelte`), which is instead now using a dedicated file [in the params folder](https://kit.svelte.dev/docs/advanced-routing#matching).

## Changes in the API endpoints

API endpoints are used for SSR (Server Side Rendering): One of the strength of SvelteKit (and other similar frameworks like NextJS) is its ability to blur the frontier between frontend and backend. In previous versions of SvelteKit, both the server and client side routing lived on the same page:

`mypage.svelte`

```html
<script context="module">
	export const load = async () => {
		// this runs on the server
		return { props: { userName } };
	};
</script>

<script>
	// This runs on the client
	export let userName;
</script>

<h1>Hello {userName}</h1>
```

The newer version can be split in two pages:

`mypage/+page.server.js`

```js
export const load = async () => {
	// this runs on the server
	return { props: { userName } };
};
```

`mypage/+page.svelte`

```html
<script>
	// This runs on the client
	export let data;
</script>

<h1>Hello {data.userName}</h1>
```

One of the benefit is that the typing experience (either through JSDoc or Typescript), since `+page.svelte` can import `PageData` to get the type returned by the SSR endpoint:

```html
<script>
	// This runs on the client
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<!-- Type error: user field is not returned by the server -->
<h1>Hello {serverData.user}</h1>
```
