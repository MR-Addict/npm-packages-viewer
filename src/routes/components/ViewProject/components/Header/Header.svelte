<script lang="ts">
  import type { ProjectType } from "$types/project";

  export let project: ProjectType;

  const dependencies = project.dependencies ? Object.keys(project.dependencies).length : 0;
  const devDependencies = project.devDependencies ? Object.keys(project.devDependencies).length : 0;
</script>

<header class="flex flex-row justify-between">
  <h1 class="text-2xl font-semibold capitalize">{project.name}</h1>
</header>
