<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import GoBack from '$lib/components/goBack.svelte';

	export const load: Load = ({ url, error, status }) => {
		return {
			props: { error, status, url }
		};
	};
</script>

<script lang="ts">
	export let url: URL;
	export let status: number | null;
	export let error: Error;
	console.log({ status, error });
	let message = error?.message;

	let title = status?.toString();
	if (status === 404) {
		title = 'Page not found :(';
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<section>
	<h1>{status}: {title}</h1>

	{#if status === 404}
		<p>There is no content at the url "<code>{url.pathname}</code>".</p>
	{:else}
		<p class="font-mono">{message}</p>
	{/if}

	<GoBack />
</section>
