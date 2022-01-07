<script lang="ts">
import WidgetOutputObjectsItem from './WidgetOutputObjectsItem.svelte';
export let objects: any;
</script>

<section class="objects">
  {#each objects as object}
    <WidgetOutputObjectsItem {object} />
  {/each}
</section>
