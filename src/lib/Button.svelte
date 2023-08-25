<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let classes = "",
        enabled = true;

    const click = createEventDispatcher();

    function handleClick() {
        click("click");
    }
</script>

<button disabled={!enabled} on:click={handleClick} class={classes}
    ><slot /></button
>

<style>
    button {
        padding: 0.5rem;
        background: transparent;
        border: 1px solid white;
    }

    :hover:enabled {
        background: white;
        cursor: pointer;
    }

    :disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
