<script>
	import { page } from '$app/stores';
	import { currentTagName } from '$lib/stores';
</script>

<header>
	<nav class="p-4">
		<ul class="flex gap-3">
			<li>
				<a class:active={$page.routeId === ''} on:click={() => currentTagName.set('')} href="/">Blog</a>
			</li>
			<li>
				<a class:active={$page.routeId?.includes('projects')} href="/projects">Projects</a>
			</li>
			<li>
				<a class:active={$page.routeId?.includes('about')} href="/about">About</a>
			</li>
		</ul>
	</nav>
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
