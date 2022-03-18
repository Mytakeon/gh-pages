<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<ul>
			<li>
				<a class:active={$page.routeId === ''} href="{base}/">Blog</a>
			</li>
			<li>
				<a class:active={$page.routeId.includes('projects')} href="{base}/projects">Projects</a>
			</li>
			<li>
				<a class:active={$page.routeId.includes('about')} href="{base}/about">About</a>
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
