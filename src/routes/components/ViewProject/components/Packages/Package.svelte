<script lang="ts">
  import CopyButton from "./CopyButton.svelte";

  export let dev: boolean;
  export let name: string;
  export let version: string;

  let latest: string | null = null;

  async function fetchPackge() {
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
      {#await fetchPackge() then latest}
        {#if latest !== version}
          <span class="absolute -right-1 -top-1 translate-x-full text-xs rounded-lg bg-green-600 text-white px-1">
            {latest}
          </span>
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
</style>