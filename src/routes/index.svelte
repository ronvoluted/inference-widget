<script lang="ts">
import '../app.css';

import Widget from '$lib/Widget.svelte';
</script>

<main class="flex flex-col w-full max-w-lg gap-8 p-8 m-auto text-justify lg:max-w-7xl">
  <div class="w-full text-center">
    <h1 class="mb-1 text-4xl">Inference Widget</h1>
    <a href="https://github.com/ronvoluted/inference-widget">github.com/ronvoluted/inference-widget</a>
  </div>
  <p class="max-w-xl p-4 m-auto border-2 rounded-lg border-slate-100 bg-slate-200 drop-shadow-md">
    This is a multi-task inference widget! Browse to or drag an image to perform the following four tasks and present
    their combined outputs: <span class="italic">object detection</span>,
    <span class="italic">label classification</span>, <span class="italic">OCR</span> and
    <span class="italic">dominant colour detection</span>.
  </p>
  <Widget />
</main>
