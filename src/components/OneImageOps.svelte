<script lang="ts">
	import Resizer from "react-image-file-resizer";

	import { makeProcessImgRequest } from "../modules/imgOpsAPI";

	export let title: string;

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

	const equalizeHistogram = async () => {
		displayImgPath = await makeProcessImgRequest("equalize-histogram", [displayImgPath]);
	};

	let lastHistPath = "X";
	const compareHistograms = async () => {
		displayImgPath = await makeProcessImgRequest("equalize-and-compare-histograms", [displayImgPath]);
		lastHistPath = displayImgPath;
	};
</script>

<div id="main">
	<h1>{title}</h1>

	<img class={lastHistPath === displayImgPath ? "imgDisplay imgTicc" : "imgDisplay"} src={displayImgPath} alt="" />

	<input class="imgFileInput" type="file" accept=".jpg, .jpeg, .png, .bmp" on:change={(e) => onFileSelected(e)} />

	<input class="loneButton" type="button" value="Original" on:click={undo} />

	<input class="loneButton" type="button" value="RGB -> 8bit" on:click={toGrayscale} />

	<input class="loneButton" type="button" value="RGB -> 1bit" on:click={toBinary} />

	<input class="loneButton" type="button" value="NOT" on:click={not} />

	<div class="inputRow">
		<input class="inputColumn" type="number" step="0.01" bind:value={divideFactor} />
		<input class="inputColumn" type="button" value="Dvidir" on:click={divide} />
	</div>

	<div class="inputRow">
		<input class="inputColumn" type="number" step="0.01" bind:value={multiplyFactor} />
		<input class="inputColumn" type="button" value="Multiplicar" on:click={multiply} />
	</div>

	<input class="loneButton" type="button" value="Equalize" on:click={equalizeHistogram} />

	<input class="loneButton" type="button" value="Equalize & Compare" on:click={compareHistograms} />
</div>

<style>
	#main {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;
		padding: 1rem;
		border-right-style: dotted;
	}
	.imgDisplay {
		display: flex;
		padding: 1rem;
		height: 500px;
		width: 500px;
	}
	.imgTicc {
		height: 725px;
		width: 1250px;
	}
	.inputRow {
		display: flex;
		flex-flow: row-reverse;
		align-items: center;
		justify-content: center;
		width: 250px;
	}
	.inputColumn {
		width: 50%;
	}
	.imgFileInput {
		width: 325px;
	}
	.loneButton {
		width: 190px;
	}
</style>
