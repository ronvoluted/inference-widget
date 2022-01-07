<script lang="ts">
let labels = [
  'Sunglasses',
  'Eyewear',
  'Gadget',
  'Font',
  'Communication Device',
  'Passport',
  'Lens',
  'Knife',
  'Book',
  'Coin',
];
</script>

<section class="labels">
  <h1>Labels</h1>
  <ul>
    {#each labels as label, i}
      <li>{label}</li>
    {/each}
  </ul>
</section>
