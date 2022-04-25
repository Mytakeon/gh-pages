<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	interface PostMetadata {
		title: string;
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

		return { props: { posts, tag } };
	};
</script>

<script lang="ts">
	import { currentTagName, tagColors } from '$lib/stores';

	export let posts: Post[];
	export let tag: string | null;

	if (tag) currentTagName.set(tag);

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
				{#if $currentTagName}
					<a href={`/`} class="cursor-pointer no-underline" on:click={() => currentTagName.set(undefined)}
						>X
					</a>
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
