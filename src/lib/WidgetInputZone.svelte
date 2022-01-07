<script lang="ts">
import { get } from 'svelte/store';
import { loadedImage, imageIsLoaded } from '$lib/stores';

let zone: HTMLElement;
let input: HTMLInputElement;
let instructions: HTMLElement;

// https://cloud.google.com/vision/docs/supported-files
const supportedTypes: ReadonlyArray<string> = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/vnd.microsoft.icon',
  'image/tiff',
  'application/pdf',
];

let unsupportedType = false;

const loadFile = (file: File): void => {
  const fileReader: FileReader = new FileReader();

  try {
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const result = fileReader.result;
      if (typeof result === 'string') {
        $loadedImage = fileReader.result as string;
        $imageIsLoaded = true;
      }
    };
  } catch (error) {
    console.error(error);
  }
};

const handleClick: EventListener = (event) => input.click();

const handleDragOver: EventListener = (event) => instructions.classList.toggle('animate-bounce', true);

const handleDragLeave: EventListener = (event) => instructions.classList.toggle('animate-bounce', false);

const handleDrop = (event: DragEvent) => {
  instructions.classList.toggle('animate-bounce', false);

  if (!event.dataTransfer?.files.length) {
    return;
  }

  const file: File = event.dataTransfer.files[0];

  if (!supportedTypes.some((type) => type === file.type)) {
    unsupportedType = true;
    return;
  }

  loadFile(file);
};

const handleInputChange: EventListener = (event) => {
  const inputElem = event.target as HTMLInputElement;
  if (!inputElem.files?.length) {
    return;
  }

  const file: File = inputElem.files[0];

  loadFile(file);
};
</script>

<div
  bind:this={zone}
  on:click={handleClick}
  on:dragleave={handleDragLeave}
  on:dragend={handleDragLeave}
  on:dragover|preventDefault={handleDragOver}
  on:drop|preventDefault={handleDrop}
  class="grid w-full border-4 border-blue-400 border-dashed rounded-lg cursor-pointer place-items-center aspect-square"
>
  <p bind:this={instructions} class="w-1/2 font-medium text-center cursor-pointer pointer-events-none select-none">
    Drag and drop image here or click to browse{unsupportedType
      ? '\n(Supported files: jpg, png, gif, bmp, webp, ico, tiff and pdf)'
      : ''}
  </p>

  <!-- Hidden with opacity instead of visibility so that it's still accessible to screen readers -->
  <input
    type="file"
    bind:this={input}
    on:change={handleInputChange}
    accept={supportedTypes.join(',')}
    class="absolute opacity-0"
  />
</div>
