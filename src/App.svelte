<script lang="ts">
  import Info from "./lib/Info.svelte";
  import Logo from "./lib/Logo.svelte";
  import Settings from "./lib/Settings.svelte";
  import Sheet from "./lib/Sheet.svelte";
</script>

<main class="container">
  <Logo />
  <Info />
  <Sheet />
  <Settings />
</main>

<style>
  .container {
    padding: var(--gap);
    gap: var(--gap);
    height: calc(100vh - 4.5 * var(--gap));

    display: grid;
    grid-template-columns: min-content 1fr 1fr;
    grid-template-rows: min-content 1fr;
    grid-template-areas:
      "logo sheet settings"
      "info sheet settings";
  }
</style>
