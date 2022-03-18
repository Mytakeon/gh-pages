<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	const route = $page.routeId;
</script>

<header>
	<nav>
		<ul>
			<li>
				<a class:active={route === ''} href="{base}/">Blog</a>
			</li>
			<li>
				<a class:active={route.includes('projects')} href="{base}/projects">Projects</a>
			</li>
			<li>
				<a class:active={route.includes('about')} href="{base}/about">About</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}

	a.active {
		text-decoration: solid;
		text-decoration-line: underline;
	}

	ul {
		display: flex;
		list-style-type: none;
		gap: 1rem;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
