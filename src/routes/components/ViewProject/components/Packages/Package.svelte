<script lang="ts">
  import CopyButton from "./CopyButton.svelte";

  import type { DependencyType } from "$types/project";

  export let dependency: DependencyType;

  const { name, version, dev } = dependency;

  let latest: string | undefined = undefined;

  async function fetchPackage() {
    const url = `https://registry.npmjs.org/${name}/latest`;
    const res = await fetch(url).then((res) => res.json());
    latest = res.version;
    return latest;
  }
</script>

<div class="wrapper">
  <div class="flex flex-row justify-between items-center px-3 py-2 bg-gray-100 rounded-t-lg">
    <p>{name}</p>

    <CopyButton message={`npm install ${name}@${latest || version} --save${dev ? "-dev" : ""}`} />
  </div>

  <div class="px-3 p-3 rounded-b-lg border-t border-t-gray-300">
    <p class="w-fit relative">
      <span>{version}</span>
      {#await fetchPackage() then latest}
        {#if latest && latest !== version}
          <span class="latest">{latest}</span>
        {/if}
      {/await}
    </p>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    box-shadow: 0 0 5px #80808040;
    @apply h-full border border-gray-300 rounded-lg;
  }
  .latest {
    @apply absolute whitespace-nowrap -right-1 -top-1 translate-x-full text-xs rounded-lg bg-green-600 text-white px-1;
  }
</style>
