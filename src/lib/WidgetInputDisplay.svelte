<script lang="ts">
import { afterUpdate } from 'svelte';
import { fade } from 'svelte/transition';
import { confidenceThreshold, imageIsLoaded, loadedImage, objects, visionResponse } from './stores';
import WidgetInputDisplayNode from './WidgetInputDisplayNode.svelte';

let inputImage: HTMLImageElement;

let imageWidth: number;
let imageHeight: number;

$: image = inputImage && { width: imageWidth, height: imageHeight };
$: objectsSortedBySize = $objects.sort((curr, next) => (curr.width * curr.height > next.width * next.height ? -1 : 1));

const reset: EventListener = () => {
  $imageIsLoaded = false;
  $loadedImage = '';
  $visionResponse = null;
  $confidenceThreshold = 0.7;
};

afterUpdate(() => {
  imageWidth = inputImage.clientWidth;
  imageHeight = inputImage.clientHeight;
});
</script>

<div class="display w-full rounded-lg h-fit" in:fade>
  <button
    on:click={reset}
    class="absolute px-2 py-1 text-xs border-2 rounded-lg border-transparent-blue right-4 top-4 bg-transparent-blue "
    >Reset</button
  >
  <h1 class="pb-1 mt-8 mb-4 text-xl text-left border-b-4 border-gray-300 border-dotted place-self-start">
    Object localisation
  </h1>
  <div class="relative grid w-full h-full place-items-center group">
    <img bind:this={inputImage} src={$loadedImage} alt="" class="w-full h-auto my-auto drop-shadow-lg" />
    {#each objectsSortedBySize as object, i}
      <div class="absolute top-0 left-0 w-full h-full">
        <WidgetInputDisplayNode {object} {image} index={i} />
      </div>
    {/each}
    {#if !$visionResponse?.length}
      <div class="absolute grid w-full h-full place-items-center bg-transparent-blue">
        <img class="w-1/2 origin-center aspect-square animate-spin" src="/spinner.svg" role="presentation" alt="" />
      </div>
    {/if}
  </div>
</div>
