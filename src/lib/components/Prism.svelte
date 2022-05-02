<script lang="ts">
	import { onMount } from 'svelte';
	import prism from 'prismjs';
	// Would need to import this dynamically
	// see https://svelte.dev/repl/3fef33867c47431b8f4edc99275640e8?version=3.12.1
	import 'prismjs/components/prism-json';
	import 'prismjs/components/prism-typescript';
	export let link: string;
	const fileName = link.split('/').pop();
	let language = link.split('.').pop();
	// from: https://raw.githubusercontent.com/Mytakeon/vite-svelte-tailwind/main/src/main.ts
	// to: https://github.com/Mytakeon/vite-svelte-tailwind/blob/main/src/main.ts
	// get the github url from the github link
	// const githubUrl = link.replace(/^https:\/\/raw.githubusercontent.com/, 'https://github.com');
	let source: string;
	let formattedCode: string | null;

	onMount(async () => {
		const response = await fetch(link);
		source = await response.text();
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
</script>

<div class="bg-slate-200 rounded-md text-right">
	{#if formattedCode}
		<pre class="language-{language} rounded-t-md" command-line data-output="2-17"><code class="language-{language}"
				>{#if language === 'none'}{formattedCode}{:else}{@html formattedCode}{/if}</code
			></pre>
	{:else}
		<pre command-line data-output="2-17"><code class="language-plain">Loading snippet...</code></pre>
	{/if}
	<a href={link} class="pr-2 no-underline hover:underline" title="View in Github">{fileName}</a>
</div>
