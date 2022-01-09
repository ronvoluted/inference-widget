<script lang="ts">
import { fade } from 'svelte/transition';
import WidgetOutputSlider from './WidgetOutputSlider.svelte';
import WidgetOutputObjects from './WidgetOutputObjects.svelte';
import WidgetOutputLabels from './WidgetOutputLabels.svelte';
import WidgetOutputText from './WidgetOutputText.svelte';
</script>

<section
  id="output"
  class="flex flex-col w-full gap-6 p-4 border-2 rounded-lg output border-slate-100 bg-slate-200 drop-shadow-md"
  in:fade
>
  <h1 class="-mb-4 font-bold">Inference output</h1>
  <WidgetOutputSlider />
  <WidgetOutputObjects />
  <WidgetOutputLabels />
  <WidgetOutputText />
</section>
