<script lang="ts">
  import project from "$stores/project";
  import Package from "./Package.svelte";
</script>

{#if $project}
  <ul class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-7">
    {#each $project.dependencies as dependency (dependency.name)}
      <li><Package name={dependency.name} /></li>
    {/each}
  </ul>
{/if}
