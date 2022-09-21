<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import '$lib/app.css';
	import '$lib/prism.css';
</script>

<svelte:head>
	<script data-goatcounter="https://mytakeon.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
</svelte:head>

<Header />

<main>
	<slot />
</main>
