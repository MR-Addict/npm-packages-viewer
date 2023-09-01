<script lang="ts">
  import z from "zod";
  import project from "$stores/project";
  import { onMount } from "svelte";
  import type { DependencyType } from "$types/project";

  import CopyButton from "./CopyButton.svelte";
  import Spinner from "$components/Spinner.svelte";
  import FaLongArrowAltRight from "svelte-icons/fa/FaLongArrowAltRight.svelte";

  export let name: string;

  let dependency: DependencyType | null = null;

  async function fetchLatest() {
    const url = `https://registry.npmjs.org/${name}/latest`;
    const res = await fetch(url).then((res) => res.json());
    const result = z.object({ version: z.string() }).safeParse(res);
    if (result.success && $project) {
      const target = $project.dependencies.find((item) => item.name === name);
      if (target) {
        target.latest = result.data.version;
        dependency = target;
      }
      project.set($project);
    }
  }

  function getLatest() {
    if ($project) {
      const target = $project.dependencies.find((item) => item.name === name);
      if (target) dependency = target;
    }
  }

  onMount(() => {
    getLatest();
    fetchLatest();
  });
</script>

{#if dependency}
  {@const { name, version, latest, dev, exact } = dependency}
  <div class="wrapper">
    <div class="flex flex-row items-center px-3 py-2 bg-gray-100 rounded-t-lg">
      <p class="relative">
        <span>{name}</span>
        <span class="label" data-dev={dev}>{dev ? "dev" : "prod"}</span>
      </p>
      {#if latest}
        {@const message = `npm install ${name}@${latest} ${dev ? "-D" : ""}${exact ? "--save-exact" : ""}`}
        <CopyButton {message} />
      {/if}
    </div>

    <div class="px-3 p-3 rounded-b-lg border-t border-t-gray-300">
      <p class="w-full flex flex-row items-center gap-1">
        <span>{version}</span>
        {#if !latest}
          <Spinner />
        {:else if latest !== version}
          <div class="h-4 text-gray-400"><FaLongArrowAltRight /></div>
          <span class="latest">{latest}</span>
        {/if}
      </p>
    </div>
  </div>
{/if}

<style lang="postcss">
  .wrapper {
    box-shadow: 0 0 5px #80808040;
    @apply h-full border border-gray-300 rounded-lg;
  }
  .latest {
    @apply whitespace-nowrap text-xs rounded-lg bg-green-600 text-white px-1;
  }
  .label {
    @apply absolute -right-1 translate-x-full;
    @apply text-xs px-1.5 rounded-lg text-white;
  }
  .label[data-dev="true"] {
    @apply bg-purple-600;
  }
  .label[data-dev="false"] {
    @apply bg-yellow-600;
  }
</style>
