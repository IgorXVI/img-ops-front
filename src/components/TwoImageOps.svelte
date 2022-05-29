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
</script>

<div id="main">
    <img class="imgDisplay" src={displayImgPath} alt="" />

    <input type="button" value="AND" on:click={and} />

    <input type="button" value="OR" on:click={or} />

    <input type="button" value="XOR" on:click={xor} />

    <input type="button" value="Adicionar" on:click={add} />

    <input type="button" value="Subtrair" on:click={subtract} />

    <input type="button" value="Média" on:click={avg} />

    <div class="inputRow">
        <input type="number" step="0.01" bind:value={blendFactor} />
        <input type="button" value="Blending" on:click={blend} />
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
        display: flex;
        padding: 1rem;
    }
    .inputRow {
        display: flex;
        flex-flow: row-reverse;
    }
</style>
