<script context="module" lang="ts">
	interface PostMetadata {
		title: string;
		tags: string[];
		date: string;
	}
	interface Post {
		metadata: PostMetadata;
		path: string;
	}

	/** @type {import('./index').Load} */
	export const load = async () => {
		const allPostFiles = import.meta.glob('./post/*.md');
		const iterablePostFiles = Object.entries(allPostFiles);

		const posts = await Promise.all(
			iterablePostFiles.map(async ([path, resolver]) => {
				const { metadata } = await resolver();

				return { metadata, path: path.slice(2, -3) };
			})
		);

		return { props: { posts } };
	};
</script>

<!-- runs client side -->
<script lang="ts">
	import { currentTagName, tagColors } from '$lib/stores';
	import { onMount } from 'svelte';

	export let posts: Post[];

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		$currentTagName = urlParams.get('tag') ?? '';
	});
	const tagsIterable = Object.entries(tagColors);
</script>

<h1 class="pb-1">Blog</h1>
<div class="py-3">
	Browse by tags:
	<div class="inline-block">
		{#each tagsIterable as [tag, color], index}
			<a
				href={`/?tag=${tag}`}
				on:click={() => currentTagName.set(tag)}
				class="p-1 rounded-md border-solid cursor-pointer no-underline"
				class:selected={$currentTagName === tag}
				style:background-color={color}
			>
				{'#' + tag}
			</a>
			{#if index === tagsIterable.length - 1}
				{#if $currentTagName !== ''}
					<a href={`/`} class="cursor-pointer no-underline" on:click={() => currentTagName.set('')}>X </a>
				{/if}
			{/if}
		{/each}
	</div>
</div>

<ul>
	{#each posts as post}
		{#if !$currentTagName || post.metadata.tags.includes($currentTagName)}
			<li class="py-2">
				<div>
					<a class="text-2xl no-underline" href={post.path}>
						{post.metadata.title}
					</a>
					<p>
						Published {post.metadata.date}
					</p>
				</div>
			</li>
		{/if}
	{/each}
</ul>

<style>
	a.selected {
		text-decoration: underline;
	}
</style>
