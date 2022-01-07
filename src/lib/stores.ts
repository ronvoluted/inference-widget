import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const imageIsLoaded: Writable<boolean> = writable(false);
export const loadedImage: Writable<string> = writable('');
