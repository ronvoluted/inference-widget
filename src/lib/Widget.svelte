<script lang="ts">
import { imageIsLoaded } from '$lib/stores';
import WidgetInput from './WidgetInput.svelte';
import WidgetOutput from './WidgetOutput.svelte';
</script>

<div class="widget w-full flex flex-col lg:flex-row m-auto gap-12">
  <WidgetInput />
  {#if $imageIsLoaded}
    <WidgetOutput />
  {/if}
</div>
