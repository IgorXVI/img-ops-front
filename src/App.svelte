<script lang="ts">
	let inputImage;
	let inputImagePath: string;

	let resultImagePath: string;

	const onFileSelected = (e) => {
		inputImage = e.target.files[0];

		let reader = new FileReader();

		reader.readAsDataURL(inputImage);

		reader.onload = (e) => {
			inputImagePath = String(e.target.result);
		};
	};

	const convertToGrayscale = async () => {
		try {
			const formData = new FormData();

			formData.append("img", inputImage);

			const res = await fetch("http://localhost:9090/process-img/grayscale", {
				method: "POST",
				body: formData,
			});

			const fullResponse = await res.blob();

			if (res.status !== 200) {
				const responseText = await fullResponse.text();

				alert(`API Request error: ${responseText}`);

				return;
			}

			resultImagePath = URL.createObjectURL(fullResponse);
		} catch (error) {
			alert(`API Request error: ${error.message}`);
		}
	};
</script>

<div id="app">
	<img class="imageDisplay" src={inputImagePath} alt="" />
	<img class="imageDisplay" src={resultImagePath} alt="" />

	<input type="file" accept=".jpg, .jpeg, .png .tif .bmp" on:change={(e) => onFileSelected(e)} />

	<input type="button" value="RGB -> 8bit" on:click={convertToGrayscale} />
</div>

<style>
	#app {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.imageDisplay {
		height: 500px;
		width: 500px;
		display: flex;
	}
</style>
