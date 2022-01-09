<script lang="ts">
import { objects } from './stores';
import WidgetOutputObjectsItem from './WidgetOutputObjectsItem.svelte';

$: sortedObjects = $objects.sort((curr, next) => (curr.confidence > next.confidence ? -1 : 1));
</script>

<section class="objects">
  <h1 class="pb-1 mb-6 text-xl border-b-4 border-gray-300 border-dotted">Objects</h1>
  <div class="flex flex-row gap-10 px-2 mx-auto content-between">
    {#each sortedObjects.slice(0, 3) as object}
      <WidgetOutputObjectsItem {object} />
    {:else}
      <p class="mx-auto text-center">No objects detected</p>
    {/each}
  </div>
</section>
