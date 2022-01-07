<script lang="ts">
import WidgetOutputSlider from './WidgetOutputSlider.svelte';
import WidgetOutputObjects from './WidgetOutputObjects.svelte';
import WidgetOutputLabels from './WidgetOutputLabels.svelte';
import WidgetOutputDescription from './WidgetOutputDescription.svelte';

export let objects: any = [1, 2, 3];
</script>

<section class="output">
  <h1>Inference output</h1>
  <WidgetOutputSlider />
  <WidgetOutputObjects {objects} />
  <WidgetOutputLabels />
  <WidgetOutputDescription />
</section>
