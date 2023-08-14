<script lang="ts">
  import type { ProjectType } from "$types/project";
  import FaAlignLeft from "svelte-icons/fa/FaAlignLeft.svelte";

  export let project: ProjectType;
</script>

<header class="flex flex-row items-center gap-1 text-gray-700">
  <div class="h-3.5"><FaAlignLeft /></div>
  <h1 class="text-lg font-semibold capitalize">{project.name}</h1>
</header>
