<script lang="ts">
import type { LocalisedObject } from 'src/global';

export let index: number;
export let object: LocalisedObject;
export let image: { width: number; height: number };

let box: HTMLElement;

$: left = object.centre && object.centre.x * 100;
$: top = object.centre && object.centre.y * 100;
$: width = image && image.width * object.width;
$: height = image && image.height * object.height;

const handleClick: EventListener = () => {
  box.classList.toggle('invisible');
};
</script>

<!-- Objects have already been sorted by size, so utilise their array index to 
     stack smaller objects on top, helping to prevent overlapping nodes from blocking each other  -->
<div class="relative origin-center" style="left: {left}%; top: {top}%; z-index: {index + 1}">
  <div
    bind:this={box}
    class="absolute invisible -translate-x-1/2 -translate-y-1/2 bg-opacity-75 border-blue-400 xs:visible box bg-transparent-blue border-thin"
    style="width: {width}px; height: {height}px"
  >
    <div class="-mt-5 text-sm text-white drop-shadow-text">{object.name}</div>
  </div>
  <div class="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer xs:hidden" on:click={handleClick}>
    <div
      class="w-4 border-2 rounded-full motion-safe:group-hover:animate-bounce sm:motion-safe:group-hover:animate-none bg-slate-200 border-stone-700 aspect-square drop-shadow-lg"
    />
  </div>
</div>
