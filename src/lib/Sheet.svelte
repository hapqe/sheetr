<script lang="ts">
    import {
        entries,
        exportScale,
        exporting,
        json,
        pixels,
        showSheet,
        size,
    } from "../stores";
    import Container from "./Container.svelte";
    import Sprite from "./Sprite.svelte";
    import domtoimage from "dom-to-image";

    let hover = false;
    let entryIndex = 0;

    function calculateSize(n: number) {
        return Math.ceil(Math.sqrt(n));
    }

    function upload(e: DragEvent) {
        e.preventDefault();

        const items = e.dataTransfer.items;

        for (let item of items) {
            const entry = item.webkitGetAsEntry();

            checkEntry(entry);
        }

        requestAnimationFrame(() => (hover = false));
    }

    function checkEntry(entry: FileSystemEntry) {
        if (entry.isFile) {
            file(entry);
        } else {
            // @ts-ignore
            const dir = entry.createReader();

            dir.readEntries((entries) => {
                for (let entry of entries) {
                    checkEntry(entry);
                }
            });
        }
    }

    function file(entry: FileSystemEntry) {
        if (entry.name.match(/\.(jpe?g|png|gif|svg)$/i)) {
            $entries = [...$entries, entry];
            $size = calculateSize($entries.length);
        }
    }

    let width = 0;
    let height = 0;

    let sheet: HTMLDivElement;

    window.addEventListener("export", (e) => {
        $exporting = true;

        const f = $pixels * $size;
        $exportScale = f / sheet.clientWidth;

        domtoimage.toPng(sheet, { width: f, height: f }).then((dataUrl) => {
            const a = document.createElement("a");
            a.download = "sheet.png";
            a.href = dataUrl;
            a.click();

            $exportScale = 1;
            $exporting = false;
        });
    });
</script>

<main
    on:dragenter|preventDefault={() => (hover = true)}
    on:dragleave|preventDefault={() => (hover = false)}
    on:dragover|preventDefault
    on:drop|preventDefault={upload}
>
    <Container>
        <div
            role="form"
            class="select center fill {hover ? 'hover' : ''}"
            bind:clientWidth={width}
            bind:clientHeight={height}
        >
            {#if !$entries.length}
                → drop sprites or directory ←
            {:else if $showSheet}
                <div
                    bind:this={sheet}
                    class="grid"
                    style="width: {Math.min(
                        width,
                        height
                    )}px; height: {Math.min(width, height)}px;"
                >
                    {#each $entries as file, index}
                        <Sprite {index} entry={file} />
                    {/each}
                </div>
            {/if}
        </div>
    </Container>
</main>

<style>
    main {
        grid-area: sheet;
    }

    .select {
        height: 100%;
    }

    main * {
        pointer-events: none;
    }

    .grid {
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
    }

    .hover {
        background-color: rgba(255, 255, 255, 0.149);
    }
</style>
