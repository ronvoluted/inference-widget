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

const handleDragEnter: EventListener = (event) => {
  instructions.classList.toggle('animate-bounce', true);
};
const handleDragLeave: EventListener = (event) => {
  if (zone.contains(event.currentTarget as HTMLElement)) {
    return;
  }

  instructions.classList.toggle('animate-bounce', false);
};
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
</script>

<div
  bind:this={zone}
  on:dragenter|preventDefault={handleDragEnter}
  on:dragover|preventDefault
  on:dragleave|preventDefault={handleDragLeave}
  on:drop|preventDefault={handleDrop}
  class="grid w-full border-4 border-blue-400 border-dashed rounded-lg cursor-pointer place-items-center aspect-square"
>
  <div bind:this={instructions} class="w-1/2 font-medium text-center">
    Drag and drop image here or click to browse{unsupportedType
      ? '\n(Supported files: jpg, png, gif, bmp, webp, ico, tiff and pdf)'
      : ''}
  </div>

  <input bind:this={input} type="file" name="imageInput" class="hidden" />
</div>
