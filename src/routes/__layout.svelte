<script>
	import Header from '$lib/components/header.svelte';
	import '$lib/app.css';
	import '$lib/prism.css';
</script>

<Header />

<main>
	<slot />
</main>
