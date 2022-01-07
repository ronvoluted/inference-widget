<script lang="ts">
export let threshold: number = 70;
</script>

<section class="confidence">
  <h1 class="pb-1 mb-3 text-xl border-b-4 border-gray-300 border-dotted">Confidence threshold</h1>
  <div class="flex flex-row gap-4">
    <input type="range" min="0" step="0.1" max="100" bind:value={threshold} class="w-full cursor-pointer" />
    <span class="w-4 text-right mr-7 tabular-nums">{threshold}%</span>
  </div>
</section>
