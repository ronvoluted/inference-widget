<script lang="ts">
export let threshold: number = 70;
</script>

<section class="confidence">
  <h1>Confidence threshold</h1>
  <input type="range" min="0" max="100" bind:value={threshold} />
</section>
