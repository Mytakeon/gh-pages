import adapter from '@sveltejs/adapter-auto';

import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
	// Allows markdown files to be imported as if they were svelte components
	extensions: ['.svelte', '.md'],
	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				post: 'src/routes/post/_post.svelte'
			}
		})
	]
};

export default config;
