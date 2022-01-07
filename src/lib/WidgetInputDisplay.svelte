<script lang="ts">
import { imageIsLoaded, loadedImage } from './stores';
import WidgetInputDisplayNode from './WidgetInputDisplayNode.svelte';

let inputImage: HTMLImageElement;

$: image = inputImage && {
  width: inputImage.clientWidth,
  height: inputImage.clientHeight,
};

const reset: EventListener = (event) => {
  $imageIsLoaded = false;
  $loadedImage = '';
};
</script>

<div class="w-full rounded-lg h-fit">
  <button
    on:click={reset}
    class="absolute px-2 py-1 text-xs border-2 rounded-lg border-transparent-blue right-4 top-4 bg-transparent-blue "
    >Reset</button
  >
  <h1 class="pb-1 mt-8 mb-4 text-xl text-left border-b-4 border-gray-300 border-dotted place-self-start">
    Object localisation
  </h1>
  <div class="relative grid w-full h-full place-items-center group">
    <img bind:this={inputImage} src={$loadedImage} alt="" class="w-full my-auto drop-shadow-lg" />
    <!-- <img bind:this={inputImage} src="/stuff.jpg" alt="" class="my-auto drop-shadow-lg" /> -->
    <!-- <img bind:this={inputImage} src="/building.jpg" alt="" class="my-auto drop-shadow-lg" /> -->
    <div class="absolute top-0 left-0 w-full h-full">
      <WidgetInputDisplayNode {image} />
    </div>
  </div>
</div>
