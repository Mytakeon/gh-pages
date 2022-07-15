<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	interface PostMetadata {
		title: string;
		description: string;
		tags: string[];
		date: string;
	}
	interface Post {
		metadata: PostMetadata;
		path: string;
	}

	export const load: Load = async ({ url }) => {
		const tag = url.searchParams.get('tag');
		const allPostFiles = import.meta.glob('./post/*.md');
		const iterablePostFiles = Object.entries(allPostFiles);

		const posts = await Promise.all(
			iterablePostFiles.map(async ([path, resolver]) => {
				const { metadata } = await resolver();

				return { metadata, path: path.slice(2, -3) };
			})
		);

		posts.sort((a, b) => {
			const aDate = new Date(a.metadata.date);
			const bDate = new Date(b.metadata.date);
			return bDate.getTime() - aDate.getTime();
		});

		return { props: { posts, tag } };
	};
</script>

<script lang="ts">
	import { TAGS } from '$lib/config';
	import { beforeNavigate } from '$app/navigation';

	export let posts: Post[];
	export let tag: string | null;

	let currentTagName: string | undefined;
	if (tag) currentTagName = tag;

	$: filteredPosts = posts.filter((post) =>
		currentTagName ? post.metadata.tags.includes(currentTagName) : true
	);

	// Hook into CSR to update `currentTagName` depending on the <a/> navigation
	beforeNavigate(({ to, from }) => {
		const fromTag = from?.searchParams.get('tag');
		const toTag = to?.searchParams.get('tag');
		// on "index?tag=a" page refresh, toTag is null, ignore it
		if (fromTag && toTag === undefined) return;
		currentTagName = toTag ?? undefined;
	});

	// e.g. April 21
	export const formatDate = (date: string) => {
		const dateObj = new Date(date);
		return dateObj.toLocaleString('en-US', { month: 'long', day: '2-digit' });
	};
</script>

<svelte:head>
	<title>{tag ? `Mytakeon - ${tag}` : 'Mytakeon'}</title>
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
</svelte:head>

<h1>Blog</h1>
<div class="pb-5">
	Browse by tags:
	<div class="inline-block">
		{#each TAGS as tag, index}
			<a
				href={`/?tag=${tag}`}
				class={`${tag} p-1 rounded-md border-solid cursor-pointer no-underline text-gray-800 dark:text-gray-200`}
				class:selected={currentTagName === tag}
			>
				{tag}
			</a>
			{#if currentTagName && index === TAGS.length - 1}
				<a href={`/`} class="cursor-pointer no-underline">X </a>
			{/if}
		{/each}
	</div>
</div>

<ul>
	{#each filteredPosts as post}
		<li class="py-1">
			<a class="no-underline" href={post.path}>
				<div
					class="flex justify-between items-center px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
				>
					<p class="text-lg">
						{post.metadata.title}
					</p>
					<p class="font-mono text-gray-500 dark:text-gray-300">
						{formatDate(post.metadata.date)}
					</p>
				</div>
			</a>
		</li>
	{/each}
</ul>

<style>
	a.selected {
		text-decoration: underline;
	}
</style>
