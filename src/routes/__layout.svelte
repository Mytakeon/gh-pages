<script>
	import Header from '$lib/components/header.svelte';
	import '$lib/app.css';
	import '$lib/prism.css';
	import { webVitals } from '$lib/vitals';
	import { browser } from '$app/env';
	import { page } from '$app/stores';

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}
</script>

<Header />

<main>
	<slot />
</main>
