<script lang="ts">
	import Resizer from "react-image-file-resizer";

	import { makeProcessImgRequest } from "../modules/imgOpsAPI";

	let originalImgPath = "/favicon.png";

	export let displayImgPath = "/favicon.png";

	const onFileSelected = (e) => {
		Resizer.imageFileResizer(
			e.target.files[0],
			500,
			500,
			"JPEG",
			100,
			0,
			(resizedFile: Blob) => {
				const resizedFilePath = URL.createObjectURL(resizedFile);

				originalImgPath = resizedFilePath;
				displayImgPath = resizedFilePath;
			},
			"blob"
		);
	};

	const undo = () => {
		displayImgPath = originalImgPath;
	};

	const toGrayscale = async () => {
		displayImgPath = await makeProcessImgRequest("grayscale", [displayImgPath]);
	};

	const toBinary = async () => {
		displayImgPath = await makeProcessImgRequest("binary", [displayImgPath]);
	};

	const not = async () => {
		displayImgPath = await makeProcessImgRequest("not", [displayImgPath]);
	};

	let divideFactor = 2;
	const divide = async () => {
		displayImgPath = await makeProcessImgRequest(`divide/${divideFactor}`, [displayImgPath]);
	};

	let multiplyFactor = 2;
	const multiply = async () => {
		displayImgPath = await makeProcessImgRequest(`multiply/${multiplyFactor}`, [displayImgPath]);
	};
</script>

<div id="main">
	<img class="imgDisplay" src={displayImgPath} alt="" />

	<input type="file" accept=".jpg, .jpeg, .png, .bmp" on:change={(e) => onFileSelected(e)} />

	<input type="button" value="Original" on:click={undo} />

	<input type="button" value="RGB -> 8bit" on:click={toGrayscale} />

	<input type="button" value="RGB -> 1bit" on:click={toBinary} />

	<input type="button" value="NOT" on:click={not} />

	<div class="inputRow">
		<input type="number" step="0.01" bind:value={divideFactor} />
		<input type="button" value="Dvidir" on:click={divide} />
	</div>

	<div class="inputRow">
		<input type="number" step="0.01" bind:value={multiplyFactor} />
		<input type="button" value="Multiplicar" on:click={multiply} />
	</div>
</div>

<style>
	#main {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
		padding: 1rem;
	}
	.imgDisplay {
		height: 500px;
		width: 500px;
		display: flex;
		padding: 1rem;
	}
	.inputRow {
		display: flex;
		flex-flow: row-reverse;
	}
</style>
