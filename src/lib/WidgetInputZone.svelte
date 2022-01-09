<script lang="ts">
import { imageIsLoaded, loadedImage, visionResponse } from '$lib/stores';
import type { VisionResponse } from 'src/global';

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

const annotateImage = async (encodedString: string): Promise<void> => {
  try {
    const annotateRes = await fetch('/annotate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(encodedString),
    });

    const annotateJSON: VisionResponse = await annotateRes.json();

    $visionResponse = annotateJSON;
  } catch (error) {
    console.error(error);
  }
};

const loadFile = async (file: File): Promise<void> => {
  const fileReader: FileReader = new FileReader();

  try {
    fileReader.readAsDataURL(file);

    fileReader.onerror = () => {
      throw new Error('Error reading file');
    };

    fileReader.onload = async () => {
      const result = fileReader.result;
      if (typeof result === 'string') {
        $loadedImage = result as string;
        $imageIsLoaded = true;

        await annotateImage(result);
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
  on:click|stopPropagation={handleClick}
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
