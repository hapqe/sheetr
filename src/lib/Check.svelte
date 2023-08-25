<script lang="ts">
    export let checked = false;
</script>

<main>
    <slot />
    <span>
        <input bind:checked type="checkbox" name="" id="" />
    </span>
</main>

<style>
    main {
        display: flex;
        align-items: center;
    }

    input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 12px;
        height: 12px;
        box-shadow: 0px 0px 0px 1px white;
        margin-left: 0.5rem;
    }
    /* if checked */
    input:checked {
        background-color: white;
    }
</style>
