// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';

import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ pages: 'docs', assets: 'docs', fallback: 'index.html' }),
		paths: { base: dev ? '' : '/gh-pages' }
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
