<script lang="ts">
	import { page } from '$app/stores';
	import GoBack from '$lib/components/goBack.svelte';

	let message = $page.error;

	let status = $page.status;
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<section>
	<h1>{status}</h1>

	{#if status === 404}
		<p>There is no content at the url "<code>{$page.url.pathname}</code>".</p>
	{:else}
		<p class="font-mono">{message}</p>
	{/if}

	<GoBack />
</section>
