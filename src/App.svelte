<script>
	import Header from './Header.svelte';
	import Main from './Main.svelte';
	import Footer from './Footer.svelte';
</script>

<style>
	.app-container {
		min-height: 100%;
		overflow: hidden;
		margin: 0px;
		display: flex;
		flex-direction: column;
	}
</style>

<body class="app-container">
	<Header></Header>
	<Main></Main>
	<Footer></Footer>
</body>
