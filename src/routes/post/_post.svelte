<script lang="ts">
	import { tagColors } from '$lib/stores';
	export let title: string;
	export let date: string;
	export let tags: (keyof typeof tagColors)[];
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<h1 class="text-3xl py-2">{title}</h1>

<p class="text-xl">Published: {date}</p>
<span>
	Tags:
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
<div class="py-5 post">
	<slot />
</div>
