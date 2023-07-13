<script lang="ts">
    import { writable } from "svelte/store";
    import {
        grid,
        pixels,
        preview,
        scaling,
        showSheet,
        size,
        xOffset,
        yOffset,
    } from "../stores";
    import Container from "./Container.svelte";
    import Slider from "./Slider.svelte";
    import Check from "./Check.svelte";
    import Button from "./Button.svelte";
</script>

<main>
    <Container>
        <div id="settings">
            <div class="wrapper">
                <div>
                    <h2>sprite</h2>
                    <Slider
                        bind:value={$pixels}
                        label={"tile size"}
                        snapPoints={[64, 128, 256]}
                    >
                        {$pixels}x{$pixels} px
                    </Slider>
                    <Slider
                        bind:value={$xOffset}
                        label={"x offset"}
                        min={-50}
                        max={50}
                        snapPoints={[0]}>{$xOffset}%</Slider
                    >
                    <Slider
                        bind:value={$yOffset}
                        label={"y offset"}
                        min={-50}
                        max={50}
                        snapPoints={[0]}>{$yOffset}%</Slider
                    >
                    <Slider
                        bind:value={$scaling}
                        label={"scaling factor"}
                        min={0.3}
                        max={3.0}
                        step={0.01}
                        snapPoints={[1.0]}>{$scaling} times</Slider
                    >
                </div>
                <div class="preview-wrapper">
                    <div
                        style="background-image: url({$preview}); transform: scale({$scaling}) translate({$xOffset}%, {$yOffset}%);"
                        class="preview fill"
                    />
                </div>
            </div>

            <div>
                <hr />
                <h2>visualization</h2>

                <Check label={"show grid"} bind:checked={$grid}>grid</Check>
                <Check label={"show sheet"} bind:checked={$showSheet}
                    >grid</Check
                >
            </div>

            <div>
                <hr />
                <h2>export</h2>
                the exported sheet will be {$pixels * $size} x {$pixels * $size}
                px.
            </div>
            <div id="export">
                <Button
                    on:click={() =>
                        window.dispatchEvent(
                            new CustomEvent("export", { detail: "png" })
                        )}>✈️ <d>export png</d></Button
                >
            </div>
        </div>
    </Container>
</main>

<style>
    main {
        grid-area: settings;
    }

    .preview {
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    .preview-wrapper {
        box-shadow: 0px 0px 0px 1px white;
        height: 200px;
        width: 200px;
        overflow: hidden;
    }

    .wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    h2 {
        margin-top: 0;
    }

    hr {
        margin-top: var(--gap);
        margin-bottom: var(--gap);
    }

    #settings {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }

    #export {
        display: flex;
        justify-content: flex-end;
    }
</style>
