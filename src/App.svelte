<script lang="ts">
	import Resizer from "react-image-file-resizer";

	import { makeProcessImgRequest } from "./imgOpsAPI";

	let originalImgPath = "/favicon.png";
	let displayImgPath = "/favicon.png";

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

	const convertToGrayscale = async () => {
		displayImgPath = await makeProcessImgRequest("grayscale", [displayImgPath]);
	};

	const convertToBinary = async () => {
		displayImgPath = await makeProcessImgRequest("binary", [displayImgPath]);
	};

	const NOToperation = async () => {
		displayImgPath = await makeProcessImgRequest("not", [displayImgPath]);
	};

	let divideFactor = 2;
	const divideByFactor = async () => {
		displayImgPath = await makeProcessImgRequest(`divide/${divideFactor}`, [displayImgPath]);
	};

	let multiplyFactor = 2;
	const multiplyByFactor = async () => {
		displayImgPath = await makeProcessImgRequest(`multiply/${multiplyFactor}`, [displayImgPath]);
	};
</script>

<div id="app">
	<img class="imgDisplay" src={displayImgPath} alt="" />

	<input type="file" accept=".jpg, .jpeg, .png, .bmp" on:change={(e) => onFileSelected(e)} />

	<input type="button" value="Original" on:click={undo} />

	<input type="button" value="RGB -> 8bit" on:click={convertToGrayscale} />

	<input type="button" value="RGB -> 1bit" on:click={convertToBinary} />

	<input type="button" value="NOT" on:click={NOToperation} />

	<input type="number" step="0.01" bind:value={divideFactor} />
	<input type="button" value="Dvidir" on:click={divideByFactor} />

	<input type="number" step="0.01" bind:value={multiplyFactor} />
	<input type="button" value="Multiplicar" on:click={multiplyByFactor} />
</div>

<style>
	#app {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
	}
	.imgDisplay {
		height: 500px;
		width: 500px;
		display: flex;
	}
</style>
