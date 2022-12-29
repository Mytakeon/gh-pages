<script lang="ts">
	import { onMount } from 'svelte';
	import prism from 'prismjs';

	// TBD: import dynamically
	// see https://svelte.dev/repl/3fef33867c47431b8f4edc99275640e8?version=3.12.1
	import 'prismjs/components/prism-json.js';
	import 'prismjs/components/prism-bash.js';
	import 'prismjs/components/prism-typescript.js';

	export let link: string;
	const fileName = link.split('/').pop()!;
	let language = fileName.includes('.') ? fileName.split('.').pop() : 'bash';
	let source: string;
	let formattedCode: string | null;
	let lineCount = 0;

	onMount(async () => {
		const response = await fetch(link);
		source = await response.text();
		lineCount = source.split('\n').length;
	});

	$: source && highlightCode();

	function highlightCode() {
		if (language) {
			if (language === 'cjs') {
				language = 'js';
			}
			const grammar = prism.languages[language];
			formattedCode = prism.highlight(source, grammar, language);
		} else {
			formattedCode = source;
		}
	}

	function copyToClipBoard(value: string) {
		navigator.clipboard.writeText(value);
	}

	function getBlobLink(rawLink: string) {
		// e.g. from: https://raw.githubusercontent.com/Mytakeon/vite-svelte-tailwind/main/src/main.ts
		// to: https://github.com/Mytakeon/vite-svelte-tailwind/blob/main/src/main.ts
		const githubUrlParts = rawLink.split('/');
		githubUrlParts[2] = 'github.com';
		githubUrlParts.splice(5, 0, 'blob');
		return githubUrlParts.join('/');
	}
</script>

<div>
	<div
		class="bg-slate-100 border border-gray-300 dark:border-gray-500 dark:bg-slate-600 p-2 mt-2 flex justify-between rounded-t-md align-middle"
	>
		<div>
			<a
				href={getBlobLink(link)}
				target="_blank"
				rel="noreferrer"
				class="no-underline hover:underline"
				title="View in Github"><code>{fileName}</code></a
			>
			<span class="text-slate-400 mr-1 ml-1">|</span>
			<code>{lineCount} lines</code>
		</div>
		<button title="copy to clipboard" on:click={() => copyToClipBoard(source)}
			><svg
				viewBox="0 0 24 24"
				width="24"
				height="24"
				stroke="currentColor"
				stroke-width="2"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="ml-2 stroke-slate-600 dark:stroke-slate-200 hover:stroke-blue-500 dark:hover:stroke-blue-500"
				><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path
					d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
				/></svg
			></button
		>
	</div>
	<div class="pb-4">
		{#if formattedCode}
			<pre class="language-{language} rounded-b-md gist" data-output="2-17"><code class="language-{language}"
					>{#if language === 'none'}{formattedCode}{:else}{@html formattedCode}{/if}</code
				></pre>
		{:else}
			<pre data-output="2-17"><code class="language-plain">Loading snippet...</code></pre>
		{/if}
	</div>
</div>
