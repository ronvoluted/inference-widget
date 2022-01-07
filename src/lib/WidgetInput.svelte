<script lang="ts">
import { imageIsLoaded } from '$lib/stores';
import WidgetInputDisplay from './WidgetInputDisplay.svelte';
import WidgetInputZone from './WidgetInputZone.svelte';

// let imageLoaded = true;
</script>

<section class="input relative w-full h-fit p-4 border-2 rounded-lg bg-slate-200">
  <h1
    class="absolute pr-2 pb-1 bg-slate-200 {imageIsLoaded
      ? ''
      : 'rounded-br-xl border-r-4 border-b-4 border-dashed border-blue-400'} font-bold"
  >
    Image input
  </h1>
  {#if $imageIsLoaded}
    <WidgetInputDisplay />
  {:else}
    <WidgetInputZone />
  {/if}
</section>
