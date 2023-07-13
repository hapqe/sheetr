<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let classes = "";

    const click = createEventDispatcher();

    function handleClick() {
        click("click");
    }
</script>

<button on:click={handleClick} class={classes}><slot /></button>

<style>
    button {
        padding: 0.5rem;
        background: transparent;
        border: 1px solid white;
    }

    :hover {
        background: white;
        cursor: pointer;
    }
</style>
