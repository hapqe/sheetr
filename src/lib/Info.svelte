<script lang="ts">
    import {
        entries,
        pixels,
        preview,
        scaling,
        xOffset,
        yOffset,
    } from "../stores";
    import Button from "./Button.svelte";
    import Container from "./Container.svelte";

    let dialog: HTMLDialogElement;

    function copy() {
        const settings = {
            scaling: $scaling,
            xOffset: $xOffset,
            yOffset: $yOffset,
            pixels: $pixels,
        };
        navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
    }

    function paste() {
        navigator.clipboard.readText().then((text) => {
            const settings = JSON.parse(text);
            scaling.set(settings.scaling);
            xOffset.set(settings.xOffset);
            yOffset.set(settings.yOffset);
            pixels.set(settings.pixels);
        });
    }

    function resetSettings() {
        scaling.set(1);
        xOffset.set(0);
        yOffset.set(0);

        dialog.close();
    }

    function resetSprites() {
        $entries = [];
        $preview = "";

        dialog.close();
    }

    function reset() {
        resetSettings();
        resetSprites();
    }
</script>

<dialog bind:this={dialog}>
    <button
        style="margin: 0; background: transparent; padding: 0; border: none"
        on:click={() => dialog.close()}
    >
        <img
            src="close.svg"
            style="cursor: pointer; height: 2rem;"
            alt=""
        /></button
    >
    <h2 style="text-align: center; margin-top: 0;">reset?</h2>
    <Button on:click={resetSprites} classes="inv-button"
        >📷 <d>sprites</d></Button
    >
    <Button on:click={resetSettings} classes="inv-button"
        >⚙️ <d>settings</d></Button
    >
    <Button on:click={reset} classes="inv-button">💣 <d>both</d></Button>
</dialog>

<main>
    <Container>
        <div class="wrapper">
            instant spritesheets with sheetr!
            <div>
                <Button on:click={copy} classes="fill-x margin-top"
                    ><d>📋 copy settings</d></Button
                >
                <Button on:click={paste} classes="fill-x margin-top"
                    ><d>👌 paste settings</d></Button
                >
                <Button
                    on:click={() => {
                        dialog.showModal();
                    }}
                    classes="fill-x margin-top"><d>🗑️ restart</d></Button
                >
            </div>
        </div>
    </Container>
</main>

<style>
    main {
        grid-area: info;
    }
    .wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    dialog {
        z-index: 100;
        background-color: white;
    }
    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }
    dialog * {
        mix-blend-mode: difference;
    }
</style>
