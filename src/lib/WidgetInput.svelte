<script lang="ts">
import { imageIsLoaded } from '$lib/stores';
import WidgetInputDisplay from './WidgetInputDisplay.svelte';
import WidgetInputZone from './WidgetInputZone.svelte';
</script>

<section
  class="input relative {$imageIsLoaded ? 'w-full h-fit' : 'mx-auto'}
         p-4 border-2 border-slate-100 rounded-lg bg-slate-200 drop-shadow-md"
>
  <h1
    class="absolute pr-2 pb-1 bg-slate-200 {$imageIsLoaded
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
