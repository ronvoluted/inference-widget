<script lang="ts">
import WidgetInputDisplay from './WidgetInputDisplay.svelte';
import WidgetInputZone from './WidgetInputZone.svelte';

// let imageLoaded = false;
let imageLoaded = true;
</script>

<section class="input relative w-full h-fit p-4 border-2 rounded-lg bg-slate-200">
  <h1
    class="absolute pr-2 pb-1 bg-slate-200 {imageLoaded
      ? ''
      : 'rounded-br-xl border-r-4 border-b-4 border-dashed border-blue-400'} font-bold"
  >
    Image input
  </h1>
  {#if imageLoaded}
    <WidgetInputDisplay />
  {:else}
    <WidgetInputZone />
  {/if}
</section>
