<script>
	import DarkModeButton from './DarkModeButton.svelte';
	import { page } from '$app/stores';
</script>

<header class="flex items-center justify-between w-3/6 m-auto">
	<nav class="p-4">
		<ul class="flex gap-3">
			<li>
				<a class:active={$page.routeId === ''} href="/">Blog</a>
			</li>
			<li>
				<a class:active={$page.routeId?.includes('projects')} href="/projects">Projects</a>
			</li>
			<li>
				<a class:active={$page.routeId?.includes('about')} href="/about">About</a>
			</li>
		</ul>
	</nav>
	<DarkModeButton />
</header>

<style>
	a {
		text-decoration: none;
		font-size: large;
	}
	a.active {
		text-decoration: solid;
		text-decoration-line: underline;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
