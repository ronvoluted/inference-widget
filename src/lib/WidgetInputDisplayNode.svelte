<script lang="ts">
export let image: ImageDimensions;

let frame: HTMLElement;

let localisation: Localisation = {
  description: 'Sunglasses',
  centre: { x: 0.82, y: 0.51 },
  width: 0.13,
  height: 0.11,
};

$: left = (localisation.centre.x - localisation.width / 2) * 100;
$: top = (localisation.centre.y - localisation.height / 2) * 100;
$: width = image && image.width * localisation.width;
$: height = image && image.height * localisation.height;

const handleClick: EventListener = (event) => {
  frame.classList.toggle('invisible');
};
</script>

<div class="relative origin-center" style="left: {left}%; top: {top}%">
  <div
    bind:this={frame}
    class="absolute invisible -translate-x-1/2 -translate-y-1/2 bg-opacity-75 border-blue-400 frame bg-transparent-blue border-thin sm:visible"
    style="width: {width}px; height: {height}px"
  >
    <div class="-mt-5 text-sm text-white drop-shadow-text">{localisation.description}</div>
  </div>
  <div class="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer sm:cursor-default" on:click={handleClick}>
    <div
      class="w-4 border-2 rounded-full motion-safe:group-hover:animate-bounce sm:motion-safe:group-hover:animate-none bg-slate-200 border-stone-700 aspect-square drop-shadow-lg"
    />
  </div>
</div>
