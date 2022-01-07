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

const sizes: Record<number, string> = {
  0: 'text-3xl leading-6',
  1: 'text-2xl leading-6',
  2: 'text-xl leading-6',
  3: 'text-lg leading-5',
};
</script>

<!-- Prevent dynamic classes from being purged -->
<span class="hidden text-3xl leading-6" />
<span class="hidden text-2xl" />
<span class="hidden text-xl" />
<span class="hidden text-lg leading-5" />

<section class="labels">
  <h1 class="pb-1 mb-3 text-xl border-b-4 border-gray-300 border-dotted">Labels</h1>
  <!-- <hr class="border-b-2" /> -->
  <ul>
    {#each labels as label, i}
      <li class="w-full flex flex-row place-content-between p-2 {i % 2 === 0 ? 'bg-transparent-blue' : ''}">
        {#if i < 4}
          <span class={sizes[i]}>{label}</span>
        {:else}
          <span>{label}</span>
        {/if}
        <span>{88.3}%</span>
        <!-- <span>{label.confidence}%</span> -->
      </li>
    {/each}
  </ul>
</section>
