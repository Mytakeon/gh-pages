<script>
	export let title;
	export let date;
	export let tags;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<h1>{title}</h1>

<p>Published: {date}</p>
<p>tags: {tags.join(', ')}</p>

<slot />
