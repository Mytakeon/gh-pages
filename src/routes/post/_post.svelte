<script>
	export let title;
	export let date;
	export let tags;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<h1 class="text-3xl py-2">{title}</h1>

<p class="text-xl">Published: {date}</p>
<p>Tags: {tags.join(', ')}</p>

<div class="py-5 post">
	<slot />
</div>
