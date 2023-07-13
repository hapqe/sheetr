<script lang="ts">
    export let value = 0,
        min = 4,
        max = 256,
        snapPoints = [],
        label = "",
        step = 1;
</script>

<main>
    {label}
    <span>
        <input
            type="range"
            {min}
            {max}
            {value}
            {step}
            on:input|preventDefault={(e) => {
                if (snapPoints.length === 0) {
                    // @ts-ignore
                    value = e.target.value;
                    return;
                }
                // @ts-ignore
                const current = e.target.value;
                const closest = snapPoints.reduce((prev, curr) =>
                    Math.abs(curr - current) < Math.abs(prev - current)
                        ? curr
                        : prev
                );
                const diff = max - min;

                if (Math.abs(closest - current) < 0.02 * diff) {
                    // @ts-ignore
                    e.target.value = closest;
                }
                // @ts-ignore
                value = e.target.value;
            }}
        />
    </span>
    <span>
        <slot>{value} px</slot>
    </span>
</main>

<style>
    main {
        margin-bottom: 16px;
    }

    input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 2px;
        padding-left: 4px;
        padding-right: 4px;
        height: 0px;
    }

    input::-webkit-slider-thumb {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        width: 16px;
        height: 16px;
        background: white;
        mix-blend-mode: difference;
        cursor: pointer;
    }
</style>
