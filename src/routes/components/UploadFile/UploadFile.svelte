<script lang="ts">
  import MdFileUpload from "svelte-icons/md/MdFileUpload.svelte";

  export let file: File | null;

  function handleUpdate(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0 && files[0].type === "application/json") file = files[0];
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
