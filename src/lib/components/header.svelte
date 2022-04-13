<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
</script>

<header>
	<nav class="p-4">
		<ul class="flex gap-3">
			<li>
				<a class:active={$page.routeId === ''} href="{base}/">Blog</a>
			</li>
			<li>
				<a class:active={$page.routeId?.includes('projects')} href="{base}/projects">Projects</a>
			</li>
			<li>
				<a class:active={$page.routeId?.includes('about')} href="{base}/about">About</a>
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
