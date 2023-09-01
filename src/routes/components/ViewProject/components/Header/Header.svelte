<script lang="ts">
  import project from "$stores/project";
  import type { DependencyType } from "$types/project";
  import FaAlignLeft from "svelte-icons/fa/FaAlignLeft.svelte";

  let devs: DependencyType[] = [];
  let prods: DependencyType[] = [];

  $: {
    if ($project) {
      devs = $project.dependencies.filter((item) => item.dev && item.latest && item.version !== item.latest);
      prods = $project.dependencies.filter((item) => !item.dev && item.latest && item.version !== item.latest);
    }
  }

  function copy(dependencies: DependencyType[], dev: boolean) {
    if (dependencies.length > 0) {
      const versions = dependencies.map((item) => `${item.name}@${item.latest}`).join(" ");
      navigator.clipboard.writeText(`npm install ${versions}${dev ? " -D" : ""}`);
    }
  }
</script>

{#if $project}
  <header class="flex flex-row items-center gap-1 text-gray-700">
    <div class="h-3.5"><FaAlignLeft /></div>
    <h1 class="text-lg font-semibold capitalize">{$project.name}</h1>

    <div class="ml-auto">
      {#if devs.length}
        <button type="button" title="Copy all updatable devDpendencies" on:click={() => copy(devs, true)}>
          Development
        </button>
      {/if}

      {#if prods.length}
        <button type="button" title="Copy all updatable dependencies" on:click={() => copy(prods, false)}>Prod</button>
      {/if}
    </div>
  </header>
{/if}

<style lang="postcss">
  button {
    @apply text-sm py-1 px-4 rounded-full bg-black/10;
  }
  button:hover {
    @apply bg-black/20 duration-300;
  }
</style>
