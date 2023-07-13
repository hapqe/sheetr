<script lang="ts">
    import { entries, grid, pixels, showSheet, size } from "../stores";
    import Container from "./Container.svelte";
    import Sprite from "./Sprite.svelte";
    import html2canvas from "html2canvas";

    let hover = false;

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
        const f = ($pixels * $size) / sheet.clientHeight;

        console.log(f);

        html2canvas(sheet, {
            backgroundColor: null,
            scale: f,
        }).then((canvas) => {
            const a = document.createElement("a");
            a.href = canvas.toDataURL("image/png");
            a.download = "spritesheet.png";
            a.click();
        });
    });
</script>

<main>
    <Container>
        <div
            role="form"
            on:mouseenter={() => (hover = $entries.length === 0)}
            on:mouseleave={() => (hover = false)}
            on:dragenter|preventDefault={() => (hover = true)}
            on:dragleave|preventDefault={() => (hover = false)}
            on:dragover|preventDefault
            on:drop|preventDefault={upload}
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
                    {#each $entries as file}
                        <Sprite {hover} entry={file} />
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

    .grid {
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        pointer-events: none;
    }

    .hover {
        background-color: rgba(255, 255, 255, 0.149);
    }
</style>
