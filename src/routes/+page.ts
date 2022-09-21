import type { PageLoad } from '.svelte-kit/types/src/routes/$types';

// Matches the metadata present at the start of each .md post
interface PostMetadata {
	title: string;
	description: string;
	tags: string[];
	date: string;
}

export const load: PageLoad = async () => {
	const allPostFiles = import.meta.glob('./post/**/*.md');

	const posts = await Promise.all(
		Object.entries(allPostFiles).map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as { metadata: PostMetadata };

			// Remove "./" at the start of the path then "+page.md" at the end to obtain the route
			return { metadata, path: path.slice(2, -9) };
		})
	);

	posts.sort((a, b) => {
		const aDate = new Date(a.metadata.date);
		const bDate = new Date(b.metadata.date);
		return bDate.getTime() - aDate.getTime();
	});

	return { posts };
};
