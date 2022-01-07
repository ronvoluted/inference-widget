<script lang="ts">
let description =
  'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.';
</script>

<section class="description">
  <h1 class="pb-1 mb-3 text-xl border-b-4 border-gray-300 border-dotted">Description</h1>
  <p class="relative p-4 text-justify border-blue-400 rounded-lg bg-transparent-blue border-b-cap">
    {description}
    <span class="absolute right-0 w-full pr-3 text-sm font-semibold text-right cursor-pointer -bottom-5"
      >Copy to clipboard</span
    >
  </p>
</section>
