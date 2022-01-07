<script context="module" lang="ts">
import type { ErrorLoad, LoadOutput } from '@sveltejs/kit';

export const load: ErrorLoad = ({ error, status }) => {
  return {
    props: {
      errorMessage: error?.message || 'Error',
      errorStatus: status,
    },
  };
};
</script>

<script lang="ts">
export let errorMessage: LoadOutput['error'];
export let errorStatus: LoadOutput['status'];

console.error({ errorStatus, errorMessage });
</script>

<svelte:head>
  <title>{errorMessage}</title>
</svelte:head>

<div class="grid w-screen h-screen place-items-center">
  <div class="place-items-center text-9xl rotate-180">🤗</div>
</div>
