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

<section class="container">
  <!-- {link} -->
  <div>
    <p>Producto:</p>
    {product.productName}
  </div>
  <div>
    <p>Categoria:</p>
    {product.category}
  </div>
  <div>
    <p>Precio:</p>
    {product.price} U$D
  </div>
  <div>
    <p>Stock:</p>
    {product.stock} unidades
  </div>
  <button> Agregar al Carrito </button>
</section>

<style>
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .container {
    background-color: hsl(0, 0%, 67%);
    padding: 5%;
    border-radius: 2rem;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-size: 3rem;
    align-items: center;
    text-align: center;
    width: 70%;
    margin-left: 15%;
    margin-top: 4rem;
    display: grid;
    grid-template-columns: 2;
    gap: 4rem;
  }
  button {
    border-radius: 1rem;
    padding: 1rem;
    background-color: rgb(44, 77, 150);
    font-weight: bolder;
    color: white;
  }
  button:hover {
    background-color: rgb(73, 92, 175);
  }
  button:focus {
    outline: none;
  }
</style>
