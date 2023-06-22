<script lang="ts">
  import file from "$stores/file";

  import MdFileUpload from "svelte-icons/md/MdFileUpload.svelte";

  function handleUpdate(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0].name === "package.json" && files[0].type === "application/json") file.set(files[0]);
  }
</script>

<section>
  <label for="upload-file-input" title="upload"><MdFileUpload /></label>
  <input type="file" id="upload-file-input" on:change={handleUpdate} class="hidden" />
</section>

<style lang="postcss">
  section {
    @apply z-10;
  }
  label {
    @apply cursor-pointer bg-cyan-600 text-white w-12 fixed right-5 md:right-10 bottom-10 p-3 rounded-full;
  }
</style>
