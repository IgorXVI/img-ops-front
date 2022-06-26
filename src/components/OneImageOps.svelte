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

	let filterMaxMaskSize = 3;
	const filterMax = async () => {
		displayImgPath = await makeProcessImgRequest(`filter/max/${filterMaxMaskSize}`, [displayImgPath]);
	};

	let filterMinMaskSize = 3;
	const filterMin = async () => {
		displayImgPath = await makeProcessImgRequest(`filter/min/${filterMinMaskSize}`, [displayImgPath]);
	};

	let filterAvgMaskSize = 3;
	const filterAvg = async () => {
		displayImgPath = await makeProcessImgRequest(`filter/avg/${filterAvgMaskSize}`, [displayImgPath]);
	};

	let filterMeanMaskSize = 3;
	const filterMean = async () => {
		displayImgPath = await makeProcessImgRequest(`filter/mean/${filterMeanMaskSize}`, [displayImgPath]);
	};

	let filterOrderMaskSize = 3;
	let filterOrderIndex = 0;
	const filterOrder = async () => {
		displayImgPath = await makeProcessImgRequest(`filter/order/${filterMaxMaskSize}/${filterOrderMaskSize}`, [displayImgPath]);
	};

	let filterConSmthMaskSize = 3;
	const filterConSmth = async () => {
		displayImgPath = await makeProcessImgRequest(`filter/conservative-smoothing/${filterConSmthMaskSize}`, [displayImgPath]);
	};
</script>

<div id="main">
	<h1>{title}</h1>

	<img class="imgDisplay" src={displayImgPath} alt="" />

	<input class="imgFileInput" type="file" accept=".jpg, .jpeg, .png, .bmp" on:change={(e) => onFileSelected(e)} />

	<input class="loneButton" type="button" value="Original" on:click={undo} />

	<div class="mainRow">
		<div class="mainColumn">
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
		</div>

		<div class="mainColumn">
			<div class="inputRow">
				<select class="inputColumn" bind:value={filterMaxMaskSize}>
					<option value="3">3x3</option>
					<option value="5">5x5</option>
					<option value="7">7x7</option>
				</select>
				<input class="inputColumn" type="button" value="Filtro Max" on:click={filterMax} />
			</div>

			<div class="inputRow">
				<select class="inputColumn" bind:value={filterMinMaskSize}>
					<option value="3">3x3</option>
					<option value="5">5x5</option>
					<option value="7">7x7</option>
				</select>
				<input class="inputColumn" type="button" value="Filtro Min" on:click={filterMin} />
			</div>

			<div class="inputRow">
				<select class="inputColumn" bind:value={filterAvgMaskSize}>
					<option value="3">3x3</option>
					<option value="5">5x5</option>
					<option value="7">7x7</option>
				</select>
				<input class="inputColumn" type="button" value="Filtro Média" on:click={filterAvg} />
			</div>

			<div class="inputRow">
				<select class="inputColumn" bind:value={filterMeanMaskSize}>
					<option value="3">3x3</option>
					<option value="5">5x5</option>
					<option value="7">7x7</option>
				</select>
				<input class="inputColumn" type="button" value="Filtro Mediana" on:click={filterMean} />
			</div>

			<div class="inputRow">
				<select class="inputColumn" bind:value={filterOrderMaskSize}>
					<option value="3">3x3</option>
					<option value="5">5x5</option>
					<option value="7">7x7</option>
				</select>
				<input class="inputColumn" type="number" step="0.01" bind:value={filterOrderIndex} />
				<input class="inputColumn" type="button" value="Filtro Ordem" on:click={filterOrder} />
			</div>

			<div class="inputRow">
				<select class="inputColumn" bind:value={filterConSmthMaskSize}>
					<option value="3">3x3</option>
					<option value="5">5x5</option>
					<option value="7">7x7</option>
				</select>
				<input class="inputColumn" type="button" value="Filtro Suav Con" on:click={filterConSmth} />
			</div>
		</div>
	</div>
</div>

<style>
	.mainRow {
		display: flex;
		flex-flow: row;
	}
	.mainColumn {
		display: flex;
		flex-flow: column;
		padding: 1rem;
	}
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
		width: 200px;
	}
</style>
