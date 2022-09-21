<script lang="ts">
	import { page } from '$app/stores';
	import { TAGS } from '$lib/config';
	import { beforeNavigate } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	let currentTag = $page.url.searchParams.get('tag');

	$: filteredPosts = data.posts.filter((post) =>
		currentTag ? post.metadata.tags.includes(currentTag) : true
	);

	// Hook into CSR to update `currentTagName` depending on the <a/> navigation
	beforeNavigate(({ to, from }) => {
		const fromTag = from?.url.searchParams.get('tag');
		const toTag = to?.url.searchParams.get('tag');
		// on "index?tag=a" page refresh, toTag is null, ignore it
		if (fromTag && toTag === undefined) return;
		currentTag = toTag ?? null;
	});

	const formatDate = (date: string) => {
		const dateObj = new Date(date);
		return dateObj.toLocaleString('en-US', { month: 'long', day: '2-digit' });
	};
</script>

<svelte:head>
	<title>{currentTag ? `Mytakeon - ${currentTag}` : 'Mytakeon'}</title>
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
</svelte:head>

<h1>Blog</h1>
<div class="gap-1 md:flex">
	<p>Browse by tags:</p>
	<div class="flex gap-1 pb-2">
		{#each TAGS as tag}
			<a
				href={`/?tag=${tag}`}
				class={`${tag} px-1 rounded-md border-solid cursor-pointer no-underline text-gray-800 dark:text-gray-200`}
				class:selected={tag === currentTag}
			>
				{tag}
			</a>
		{/each}
		{#if currentTag}
			<a aria-label="View all tags" href={`/`} class="cursor-pointer no-underline pl-2">
				<svg
					viewBox="0 0 24 24"
					width="24"
					height="24"
					stroke="currentColor"
					stroke-width="1.5"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
				>
			</a>
		{/if}
	</div>
</div>

<div data-sveltekit-prefetch>
	{#each filteredPosts as post}
		<a class="no-underline" href={post.path}>
			<div
				class="md:flex px-2 py-1 justify-between items-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
			>
				<p class="md:text-lg">{post.metadata.title}</p>
				<p class="text-sm md:text-base font-mono text-gray-500 dark:text-gray-300">
					{formatDate(post.metadata.date)}
				</p>
			</div>
		</a>
	{/each}
</div>

<style>
	a.selected {
		text-decoration: underline;
	}
</style>
