<script lang="ts">
import { confidenceThreshold } from '$lib/stores';
</script>

<section class="confidence">
  <h1 id="confidence" class="pb-1 mb-3 text-xl border-b-4 border-gray-300 border-dotted">Confidence threshold</h1>
  <div class="flex flex-row gap-4">
    <input
      type="range"
      aria-labelledby="confidence"
      min="0"
      step="0.01"
      max="1"
      bind:value={$confidenceThreshold}
      class="w-full cursor-pointer"
    />
    <span class="w-4 text-right mr-8 tabular-nums">{($confidenceThreshold * 100).toFixed(1)}%</span>
  </div>
</section>
