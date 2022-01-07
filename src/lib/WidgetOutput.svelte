<script lang="ts">
import WidgetOutputSlider from './WidgetOutputSlider.svelte';
import WidgetOutputObjects from './WidgetOutputObjects.svelte';
import WidgetOutputLabels from './WidgetOutputLabels.svelte';
import WidgetOutputDescription from './WidgetOutputDescription.svelte';

export let objects: any = [1, 2, 3];
</script>

<section class="output flex flex-col gap-6 w-full p-4 border-2 rounded-lg bg-slate-200">
  <h1 class="font-bold -mb-4">Inference output</h1>
  <WidgetOutputSlider />
  <WidgetOutputObjects {objects} />
  <WidgetOutputLabels />
  <WidgetOutputDescription />
</section>
