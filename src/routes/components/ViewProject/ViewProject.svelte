<script lang="ts">
  import file from "$stores/file";
  import Header from "./components/Header/Header.svelte";
  import Packages from "./components/Packages/Packages.svelte";
</script>

{#await $file.data then project}
  {#if project}
    <section class="w-full flex flex-col gap-2">
      <Header {project} />
      <Packages {project} />
    </section>
  {:else}
    <section class="w-full flex-1 flex items-center justify-center">
      <div class="flex flex-row justify-center flex-wrap">
        <span>Upload your</span>
        <span class="mx-1 font-semibold text-red-600">package.json</span>
        <span>by clicking button right bottom</span>
      </div>
    </section>
  {/if}
{/await}
