<script lang="ts">
  import type { ProjectType } from "$types/project";

  import Header from "./components/Header/Header.svelte";
  import Packages from "./components/Packages/Packages.svelte";

  export let project: ProjectType;
</script>

<section class="w-full flex flex-col gap-2">
  <Header {project} />
  <Packages {project} />
</section>
