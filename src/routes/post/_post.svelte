<script>
	// @ts-nocheck (TS is not supported by mdsvex)

	import { page } from '$app/stores';
	import GoBack from '$lib/components/goBack.svelte';

	export let title;
	export let description;
	export let date;
	export let tags;

	// e.g. April 21, 2022
	const formatDate = (date) => {
		const dateObj = new Date(date);
		return dateObj.toLocaleString('en-US', {
			month: 'long',
			day: '2-digit',
			year: 'numeric'
		});
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
	<meta property="og:title" content={title} />
</svelte:head>

<article class="post">
	<h1 class="text-3xl pb-2">{title}</h1>

	<div class="flex justify-between items-center">
		<span class="text-lg dark:text-gray-300">
			Written on {formatDate(date)} (<a
				target="_blank"
				href={`https://github.com/Mytakeon/gh-pages/blob/master/src/routes/${$page.routeId}.md`}>source</a
			>)
		</span>
		<span class="flex gap-1">
			{#each tags as tag}
				<a
					href={`/?tag=${tag}`}
					class={`${tag} px-1 rounded-md border-solid cursor-pointer no-underline text-gray-800 dark:text-gray-200`}
				>
					{tag}
				</a>
			{/each}
		</span>
	</div>
	<div class="my-4 h-[0.15rem] w-[100vw] bg-slate-500 sm:mx-0 sm:w-full rounded-lg" />

	<slot />
</article>
<GoBack />
