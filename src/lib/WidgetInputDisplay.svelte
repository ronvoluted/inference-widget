<script lang="ts">
import { loadedImage } from './stores';
import WidgetInputDisplayNode from './WidgetInputDisplayNode.svelte';

let inputImage: HTMLImageElement;

$: image = inputImage && {
  width: inputImage.clientWidth,
  height: inputImage.clientHeight,
};
</script>

<div class="w-full rounded-lg h-fit">
  <h1 class="pb-1 mt-8 mb-4 text-xl text-left border-b-4 border-gray-300 border-dotted place-self-start">
    Object localisation
  </h1>
  <!-- <div class="grid place-items-center"> -->
  <div class="relative w-full h-full group">
    <img bind:this={inputImage} src={$loadedImage} alt="" class="my-auto drop-shadow-lg" />
    <!-- <img bind:this={inputImage} src="/stuff.jpg" alt="" class="my-auto drop-shadow-lg" /> -->
    <!-- <img bind:this={inputImage} src="/building.jpg" alt="" class="my-auto drop-shadow-lg" /> -->
    <div class="absolute top-0 left-0 w-full h-full">
      <WidgetInputDisplayNode {image} />
    </div>
  </div>
</div>
