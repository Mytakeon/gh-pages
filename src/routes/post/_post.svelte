<script>
	import { tagColors } from '$lib/stores';
	import { page } from '$app/stores';
	export let title;
	export let date;
	export let tags;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<h1 class="text-3xl py-2">{title}</h1>

<div class="flex justify-between text-center">
	<span class="text-lg">
		Published: {date} (<a
			href={`https://github.com/Mytakeon/gh-pages/blob/master/src/routes/${$page.routeId}.md`}>source</a
		>)
	</span>
	<span>
		{#each tags as tag}
			<a
				href={`/?tag=${tag}`}
				class="no-underline p-1 mx-1 rounded-md border-solid"
				style:background-color={tagColors[tag]}
			>
				{'#' + tag}
			</a>
		{/each}
	</span>
</div>

<div class="py-5 post">
	<slot />
</div>
