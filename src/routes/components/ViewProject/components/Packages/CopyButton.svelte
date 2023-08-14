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

<button type="button" title="copy" on:click={handleCopy} class="btn">
  <span class="icon" class:active={copied}><MdCheck /></span>
  <span class="icon" class:active={!copied}><MdContentCopy /></span>
</button>

<style lang="postcss">
  .btn {
    @apply ml-auto relative text-gray-400;
  }
  .btn:hover {
    @apply text-gray-500;
  }
  .icon {
    @apply w-3.5 invisible opacity-0 scale-95 absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2;
  }
  .icon.active {
    @apply visible opacity-100 scale-100 duration-300;
  }
</style>
