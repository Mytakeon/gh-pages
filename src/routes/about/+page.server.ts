import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';

export const load: PageServerLoad = async () => {
	// see https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
	return { sha: process.env.VITE_VERCEL_GIT_COMMIT_SHA };
};
