<script lang="ts">
import '../app.css';

import Widget from '$lib/Widget.svelte';
</script>

<main class="w-full max-w-lg lg:max-w-7xl flex flex-col gap-8 m-auto p-8 text-justify">
  <div class="w-full text-center">
    <h1 class="text-4xl mb-1">Inference Widget</h1>
    <a href="https://github.com/ronvoluted/inference-widget">github.com/ronvoluted/inference-widget</a>
  </div>
  <p class="max-w-xl m-auto p-4 border-2 rounded-lg bg-slate-200">
    This is a multi-task inference widget! Browse to or drag an image to perform the following four tasks and present
    their combined outputs: <span class="italic">object detection</span>,
    <span class="italic">label classification</span>, <span class="italic">OCR</span> and
    <span class="italic">dominant colour detection</span>.
  </p>
  <Widget />
</main>

<!-- <footer>
    <p>🤗</p>
  </footer> -->
