<script lang="ts">
  import MdCheck from "svelte-icons/md/MdCheck.svelte";
  import MdContentCopy from "svelte-icons/md/MdContentCopy.svelte";

  export let message: string | number;

  let copied = false;

  function handleCopy() {
    copied = true;
    navigator.clipboard.writeText(String(message));
    setTimeout(() => (copied = false), 1000);
  }
</script>

<button type="button" title="copy" on:click={handleCopy} class="text-gray-400 w-3.5 hover:text-gray-500">
  {#if copied}
    <MdCheck />
  {:else}
    <MdContentCopy />
  {/if}
</button>
