<script lang="ts">
import { colours, loadedImage } from './stores';
import type { LocalisedObject } from 'src/global';
export let object: LocalisedObject;

$: backgroundPosX = object.centre && object.centre.x * 100;
$: backgroundPosY = object.centre && object.centre.y * 100;
$: backgroundSize = (1 / (object.width * object.height)) * 25;
</script>

<div class="w-full mx-auto">
  <div class="relative my-4">
    <div
      id={object.name}
      alt={object.name}
      class="relative w-10 mx-auto rounded-full xs:w-16 sm:w-20 md:w-30 xl:w-32 aspect-square"
      style="background-image: url({$loadedImage});
             background-position: {backgroundPosX}% {backgroundPosY}%;
             background-size: {backgroundSize >= 100 ? `clamp(100%, ${backgroundSize}%, 400%)` : 'cover'};
             box-shadow: 0 0 0rem 0.3rem {$colours[0].colour},
                         0 0 0.5rem 0.6rem {$colours[1].colour},
                         0 0 0.5rem 0.9rem {$colours[2].colour};"
    >
      <div
        class="absolute p-2 text-xs font-bold text-center border-2 rounded-full bg-transparent-blue sm:block -top-4 -right-4 border-transparent-blue w-9 aspect-square"
      >
        <span class="inline-block text-white -translate-x-1 drop-shadow-text">
          {(object.confidence * 100).toFixed(1)}
        </span>
      </div>
    </div>
  </div>
  <label for={object.name} class="block mx-auto mt-6 font-bold text-center break-words">{object.name}</label>
</div>
