<script>
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link href="https://cdn.jsdelivr.net/npm/daisyui@5.0.0-beta.1/daisyui.css" rel="stylesheet" type="text/css" />
</svelte:head>

<div class="navbar bg-black shadow-sm">
	<a class="text-2xl font-mono text-white" href="/">fork..</a>
</div>

{@render children()}
