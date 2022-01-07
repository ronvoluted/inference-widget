<script lang="ts">
import Widget from '$lib/Widget.svelte';
</script>

<header>
  <h1>Inference Widget</h1>
</header>

<main>
  <div class="description">
    <p>
      This is a multi-task inference widget! Browse to or drag an image to perform the following four tasks on and
      present their combined outputs:
    </p>
    <ul>
      <li>Object detection</li>
      <li>Label classification</li>
      <li>OCR</li>
      <li>Dominant colours</li>
    </ul>
  </div>
  <Widget />
</main>

<footer>
  <p>🤗</p>
</footer>
