<!-- Runs server side, before component is rendered -->
<script context="module">
	const allPostFiles = import.meta.glob('../blog/*.md');
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

<h1>Blog</h1>
Browse by tags:
<div class="tags">
	{#each tags as tag, index}
		<span
			class="tag"
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
					class="close"
					on:click={() => {
						window.history.pushState({}, '', '/blog');
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

<ul>
	{#each posts as post}
		{#if !currentTag || post.meta.tags.includes(currentTag)}
			<li>
				<h2>
					<a href={post.path}>
						{post.meta.title}
					</a>
				</h2>
				Published {post.meta.date}
			</li>
		{/if}
	{/each}
</ul>

<style>
	span.tag {
		background-color: rgb(251, 236, 221);
		box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px inset;
		border-radius: 3px;
		padding-left: 0.3em;
		padding-right: 0.3em;
		padding-top: 0.1em;
		padding-bottom: 0.1em;
		color: inherit;
		text-decoration: none;
	}
	span.tag:hover {
		cursor: pointer;
	}
	span.close:hover {
		cursor: pointer;
	}
	span.tag.selected {
		text-decoration: underline;
	}

	div.tags {
		display: inline-block;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	ul {
		list-style-type: none;
	}
</style>
