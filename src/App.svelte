<script lang="ts">
	import OneImageOps from "./components/OneImageOps.svelte";
	import TwoImageOps from "./components/TwoImageOps.svelte";

	let img1Path: string;
	let img2Path: string;
</script>

<div id="main">
	<OneImageOps bind:displayImgPath={img1Path} title="Imagem A" />
	<OneImageOps bind:displayImgPath={img2Path} title="Imagem B" />
	<TwoImageOps {img1Path} {img2Path} />
</div>

<style>
	#main {
		display: flex;
		flex-flow: row;
	}
</style>
