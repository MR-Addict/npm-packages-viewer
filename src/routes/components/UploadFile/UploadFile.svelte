<script lang="ts">
  import FaBroom from "svelte-icons/fa/FaBroom.svelte";
  import MdFileUpload from "svelte-icons/md/MdFileUpload.svelte";

  export let file: File | null;

  function handleUpdate(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0 && files[0].type === "application/json") file = files[0];
  }
</script>

<section>
  {#if file}
    <button title="clear" on:click={() => (file = null)}><FaBroom /></button>
  {:else}
    <label for="upload-file-input" title="upload"><MdFileUpload /></label>
    <input type="file" id="upload-file-input" on:change={handleUpdate} class="hidden" />
  {/if}
</section>

<style lang="postcss">
  section {
    @apply z-10;
  }
  :is(button, label) {
    @apply cursor-pointer bg-cyan-600 text-white w-12 fixed right-5 sm:right-10 bottom-10 p-3 rounded-full;
  }
</style>
