<script>
  import { onMount } from "svelte";
  export let product = {};
  export let id;
  onMount(async () => {
    const res = await fetch(
      `https://pinto-slash-marigold.glitch.me/product/${id}`
    );
    const response = await res.json();
    product = response.data;
  });
</script>

<div class="container">
  <pre>{product.productName}</pre>
</div>

<style>
  .container {
    align-items: center;
    text-align: center;
    width: 70%;
    margin-left: 15%;
  }
</style>
