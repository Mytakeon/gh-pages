<script lang="ts">
	import type { PageData } from '.svelte-kit/types/src/routes/about/$types';

	export let data: PageData;
</script>

<h1>Hi! 👋</h1>

<p>
	My name is Arthur. I work as a Software Engineer in Dublin. Feel free to reach out by
	<a href="mailto:arthur.alglave(at)gmail.com">email</a> or find me on
	<a href="https://www.linkedin.com/in/arthur-alglave/">LinkedIn</a>.
</p>

<p>
	This website is built with <a href="https://kit.svelte.dev/">SvelteKit</a> and deployed with
	<a href="https://vercel.com/">Vercel</a>. The code hosted publicly on
	{#if data.sha}
		<a href="https://github.com/Mytakeon/gh-pages">Github</a>
		(you are looking at version
		<code
			><a target="_blank" href="https://github.com/Mytakeon/gh-pages/commit/{data.sha}"
				>{data.sha.slice(0, 6)}</a
			></code
		>).
	{:else}
		<a href="https://github.com/Mytakeon/gh-pages">Github</a>.
	{/if}
</p>
