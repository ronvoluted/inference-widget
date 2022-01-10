<script lang="ts">
import { imageIsLoaded } from '$lib/stores';
import WidgetInput from './WidgetInput.svelte';
import WidgetOutput from './WidgetOutput.svelte';
</script>

<div class="flex flex-col w-full gap-12 m-auto widget lg:flex-row">
  <WidgetInput />
  {#if $imageIsLoaded}
    <WidgetOutput />
  {/if}
</div>
