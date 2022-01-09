import { derived, writable } from 'svelte/store';
import {
  parseLabelAnnotations,
  parseObjectAnnotations,
  parsePropertyAnnotations,
  parseTextAnnotations,
} from '$lib/annotations';

import type { Writable } from 'svelte/store';
import type { VisionResponse } from 'src/global';

export const imageIsLoaded: Writable<boolean> = writable(false);

export const loadedImage: Writable<string> = writable('unloaded');

export const visionResponse: Writable<VisionResponse | null> = writable();

export const confidenceThreshold: Writable<number> = writable(0.75);

export const labels = derived([visionResponse, confidenceThreshold], ([$visionResponse, $confidenceThreshold]) => {
  if (!$visionResponse?.length || !$visionResponse[0].labelAnnotations || !confidenceThreshold) {
    return [];
  }

  return parseLabelAnnotations($visionResponse[0].labelAnnotations, $confidenceThreshold);
});

export const text = derived([visionResponse, confidenceThreshold], ([$visionResponse, $confidenceThreshold]) => {
  if (!$visionResponse?.length || !$visionResponse[0].labelAnnotations || !confidenceThreshold) {
    return [];
  }

  return parseTextAnnotations($visionResponse[0].fullTextAnnotation, $confidenceThreshold);
});

export const objects = derived([visionResponse, confidenceThreshold], ([$visionResponse, $confidenceThreshold]) => {
  if (!$visionResponse?.length || !$visionResponse[0].localizedObjectAnnotations || !confidenceThreshold) {
    return [];
  }

  return parseObjectAnnotations($visionResponse[0].localizedObjectAnnotations, $confidenceThreshold);
});

export const colours = derived(visionResponse, ($visionResponse) => {
  if (!$visionResponse?.length || !$visionResponse[0].imagePropertiesAnnotation || !confidenceThreshold) {
    return [];
  }

  return parsePropertyAnnotations($visionResponse[0].imagePropertiesAnnotation);
});
