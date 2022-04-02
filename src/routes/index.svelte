<!-- Runs server side, before component is rendered -->
<script context="module">
	const allPostFiles = import.meta.glob('./post/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	export const load = async () => {
		const allPosts = await Promise.all(
			iterablePostFiles.map(async ([path, resolver]) => {
				const { metadata } = await resolver();
				const postPath = path.slice(2, -3);

				return {
					meta: metadata,
					path: postPath
				};
			})
		);

		const allTags = [].concat.apply(
			[],
			allPosts.map((post) => post.meta.tags)
		);

		return { props: { posts: allPosts, tags: [...new Set(allTags)] } };
	};
</script>

<!-- runs client side -->
<script>
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	export let posts;
	export let tags;
	let currentTag;

	const colors = ['#FBECDD', '#FBF3DB', '#EDF3EC', '#E7F3F8', '#FDEBEC'];
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		currentTag = urlParams.get('tag') ?? '';
	});
</script>

<h1 class="text-4xl py-4">Blog</h1>
<div class="py-3">
	Browse by tags:
	<div class="inline-block">
		{#each tags as tag, index}
			<span
				class="p-1 rounded-md border-solid border-2 border-gray-300 cursor-pointer"
				class:selected={currentTag === tag}
				style="background-color: {colors[index]}"
				on:click={() => {
					currentTag = tag;
					window.history.pushState({}, '', `?tag=${tag}`);
				}}
			>
				{'#' + tag}
			</span>
			{#if index === tags.length - 1}
				{#if currentTag !== ''}
					<span
						class="cursor-pointer"
						on:click={() => {
							window.history.pushState({}, '', `${base}/`);
							currentTag = '';
						}}
						>X
					</span>
				{/if}
			{:else}
				<span>, </span>
			{/if}
		{/each}
	</div>
</div>

<ul>
	{#each posts as post}
		{#if !currentTag || post.meta.tags.includes(currentTag)}
			<li>
				<h2 class="text-2xl py-2">
					<a href="{base}/{post.path}">
						{post.meta.title}
					</a>
				</h2>
				Published {post.meta.date}
			</li>
		{/if}
	{/each}
</ul>

<style>
	span.selected {
		text-decoration: underline;
	}
</style>
