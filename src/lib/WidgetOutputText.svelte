<script lang="ts">
import { text } from '$lib/stores';

const copyToClipboard: EventListener = () => {
  navigator.clipboard.writeText($text.join(', '));
};
</script>

<section class="description">
  <h1 class="pb-1 mb-3 text-xl border-b-4 border-gray-300 border-dotted">Text</h1>
  {#if $text.length}
    <p
      on:click={copyToClipboard}
      class="relative p-4 text-justify border-blue-400 rounded-lg bg-transparent-blue border-b-cap"
    >
      {$text?.join(' ')}
      <span class="absolute right-0 w-full pr-3 text-sm font-semibold text-right cursor-pointer -bottom-5"
        >Copy to clipboard</span
      >
    </p>
  {:else}
    <p class="relative p-4 text-center border-transparent rounded-lg bg-transparent-blue">No text detected</p>
  {/if}
</section>
