
import type { PageLoad } from '@sveltejs/kit';

interface PostMetadata {
	title: string;
	description: string;
	tags: string[];
	date: string;
}
interface Post {
	metadata: PostMetadata;
	path: string;
}

export const load: PageLoad = async ({ url }) => {
	const tag = url.searchParams.get('tag');
	const allPostFiles = import.meta.glob('./post/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const posts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();

			return { metadata, path: path.slice(2, -3) };
		})
	);

	posts.sort((a, b) => {
		const aDate = new Date(a.metadata.date);
		const bDate = new Date(b.metadata.date);
		return bDate.getTime() - aDate.getTime();
	});

	return { posts, tag };
};
