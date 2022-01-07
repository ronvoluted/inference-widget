<script lang="ts">
export let object: any;
let confidence = 93.2;
</script>

<div class="object">
  <div class="image relative">
    <img id={object} src="/favicon.png" alt="" />
    <div class="absolute top-0 right-0 border-2 rounded-full p-2">
      {confidence}%
    </div>
  </div>
  <label for={object}>duck</label>
</div>
