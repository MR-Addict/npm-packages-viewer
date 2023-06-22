<script lang="ts">
  import type { ProjectType } from "$types/project";
  import Package from "./Package.svelte";

  export let project: ProjectType;
</script>

<ul class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-7">
  {#if project.dependencies}
    {@const dependencies = project.dependencies}

    {#each Object.keys(dependencies) as key (key)}
      {@const name = key}
      {@const version = dependencies[key].replace("^", "")}
      <li><Package dev={false} {name} {version} /></li>
    {/each}
  {/if}

  {#if project.devDependencies}
    {@const devDependencies = project.devDependencies}

    {#each Object.keys(devDependencies) as key (key)}
      {@const name = key}
      {@const version = devDependencies[key].replace("^", "")}
      <li><Package dev={true} {name} {version} /></li>
    {/each}
  {/if}
</ul>
