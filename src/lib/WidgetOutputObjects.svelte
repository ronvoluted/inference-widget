<script lang="ts">
import WidgetOutputObjectsItem from './WidgetOutputObjectsItem.svelte';
export let objects: any;
</script>

<section class="objects">
  <h1 class="pb-1 mb-6 text-xl border-b-4 border-gray-300 border-dotted">Objects</h1>
  <div class="flex flex-row gap-10 mx-8 content-evenly">
    {#each objects as object}
      <WidgetOutputObjectsItem {object} />
    {/each}
  </div>
</section>
