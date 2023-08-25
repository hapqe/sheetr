<script lang="ts">
    import { onMount } from "svelte";
    import {
        exportScale,
        exporting,
        grid,
        json,
        preview,
        scaling,
        selected,
        size,
        xOffset,
        yOffset,
    } from "../stores";

    export let entry: FileSystemEntry, index: number;

    let url = "";

    onMount(() => {
        const path = entry.fullPath.split("/").filter((p) => p);
        if (path.length === 1) {
            $json[path[0]] = index;
        } else {
            path.pop();

            let x = $json;
            for (const p of path) {
                x = x[p] = x[p] ?? {};
            }
            x.from = x.from ?? index;
            x.to = index;
        }

        // @ts-ignore
        entry.file((f) => {
            url = URL.createObjectURL(f);
        });
    });
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<main
    on:click={() => {
        $selected = entry;
        $preview = url;
    }}
    class="{$grid && !$exporting ? 'outline' : ''} {$selected == entry &&
    !$exporting
        ? 'selected'
        : ''}"
    style="width: calc({$exportScale} * 100% / {$size}); height: calc({$exportScale} * 100% / {$size});"
>
    <div
        class="fill"
        style="transform: scale({$scaling}) translate({$xOffset}%, {$yOffset}%); background-image: url({url});"
    />
</main>

<style>
    main {
        overflow: hidden;
        pointer-events: all;
    }

    main:hover,
    .selected {
        background-color: rgba(255, 255, 255, 0.256);
    }

    div {
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    .outline {
        box-shadow: 0px 0px 0px 1px white;
    }
</style>
