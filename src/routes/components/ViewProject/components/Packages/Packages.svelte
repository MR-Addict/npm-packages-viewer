<script lang="ts">
  import Package from "./Package.svelte";
  import type { ProjectType } from "$types/project";

  export let project: ProjectType;
</script>

<ul class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-7">
  {#each project.dependencies as dependency (dependency.name)}
    <li><Package {dependency} /></li>
  {/each}
</ul>
