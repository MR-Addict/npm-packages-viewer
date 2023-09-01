<script lang="ts">
  import project from "$stores/project";
  import parsePackage from "$lib/parsePackage";

  import UploadFile from "./components/UploadFile/UploadFile.svelte";
  import ViewProject from "./components/ViewProject/ViewProject.svelte";

  let file: File | null;

  $: file && parsePackage(file).then((res) => project.set(res));
</script>

<UploadFile bind:file />

{#if $project}
  <ViewProject />
{:else}
  <section class="w-full flex-1 flex items-center justify-center">
    <div class="flex flex-row justify-center flex-wrap">
      <span>Upload your</span>
      <span class="mx-1 font-semibold text-red-600">package.json</span>
      <span>by clicking button right bottom</span>
    </div>
  </section>
{/if}
