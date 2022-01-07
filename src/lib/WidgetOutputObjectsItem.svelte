<script lang="ts">
export let object: any;
let confidence = 93;
</script>

<div class="max-w-xs object">
  <div class="relative my-4">
    <img
      id={object}
      src="/favicon.png"
      alt=""
      class="rounded-full  border-2 border-black"
      style="box-shadow: 0 0 0rem 0.3rem blue,
                           0 0 0.5rem 0.6rem red,
                           0 0 0.5rem 0.9rem green"
    />
    <div
      class="absolute hidden sm:block -top-2 -right-2 p-2 text-xs font-bold text-center border-2 border- rounded-full w-9 aspect-square bg-blue-400"
    >
      <span class="inline-block -translate-x-1">
        {confidence}%
      </span>
    </div>
  </div>
  <label for={object} class="block text-center wrp">duck</label>
</div>
