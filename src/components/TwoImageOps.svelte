<script lang="ts">
    import { makeProcessImgRequest } from "../modules/imgOpsAPI";

    export let img1Path: string;
    export let img2Path: string;

    let displayImgPath = "/favicon.png";

    const and = async () => {
        displayImgPath = await makeProcessImgRequest("and", [img1Path, img2Path]);
    };

    const or = async () => {
        displayImgPath = await makeProcessImgRequest("or", [img1Path, img2Path]);
    };

    const xor = async () => {
        displayImgPath = await makeProcessImgRequest("xor", [img1Path, img2Path]);
    };

    const add = async () => {
        displayImgPath = await makeProcessImgRequest("add", [img1Path, img2Path]);
    };

    const subtract = async () => {
        displayImgPath = await makeProcessImgRequest("subtract", [img1Path, img2Path]);
    };

    const avg = async () => {
        displayImgPath = await makeProcessImgRequest("avg", [img1Path, img2Path]);
    };

    let blendFactor = 0.5;
    const blend = async () => {
        displayImgPath = await makeProcessImgRequest(`blend/${blendFactor}`, [img1Path, img2Path]);
    };

    let lastHistPath = "X";
    const compareHistograms = async () => {
        displayImgPath = await makeProcessImgRequest("compare-histograms", [img1Path, img2Path]);
        lastHistPath = displayImgPath;
    };
</script>

<div id="main">
    <h1>Imagem Resultante</h1>

    <img class={lastHistPath === displayImgPath ? "imgDisplay imgTicc" : "imgDisplay"} src={displayImgPath} alt="" />

    <div class="mainRow">
        <div class="mainColumn">
            <input class="loneButton" type="button" value="AND" on:click={and} />

            <input class="loneButton" type="button" value="OR" on:click={or} />

            <input class="loneButton" type="button" value="XOR" on:click={xor} />

            <div class="inputRow">
                <input class="inputColumn" type="number" step="0.01" bind:value={blendFactor} />
                <input class="inputColumn" type="button" value="Blending" on:click={blend} />
            </div>
        </div>

        <div class="mainColumn">
            <input class="loneButton" type="button" value="Adicionar" on:click={add} />

            <input class="loneButton" type="button" value="Subtrair" on:click={subtract} />

            <input class="loneButton" type="button" value="Média" on:click={avg} />

            <input class="loneButton" type="button" value="Comparar histogramas" on:click={compareHistograms} />
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
    }
    .imgDisplay {
        display: flex;
        padding: 1rem;
        height: 500px;
        width: 500px;
    }
    .imgTicc {
        height: 750px;
        width: 1500px;
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
    .loneButton {
        width: 200px;
    }
</style>
