<script>
  export let collection;
  let Show = true;

  const searchOffer = async () => {
    Show = false;
    const res = await fetch(
      `https://pouncing-mire-firewall.glitch.me/sales/20`
    );
    const response = await res.json();
    collection = response.data;
  };
</script>

<div class="container">
  {#if Show}
    <button class="custom-button"> Cyber Monday </button>
    <button class="custom-button" on:click={searchOffer}> Black Friday </button>
    <button class="custom-button"> Otras Ofertas </button>
  {/if}
  <div>
    {#if !!collection}
      {#each collection as { data, link }}
        <div class="prod-container">
          <!-- {link} -->
          <div>{data.productName}</div>
          <div>{data.category}</div>
          <div>U$D : {data.price}</div>
          {#if link}<a href={link}><button>Comprar</button></a>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .container {
    width: 70%;
    margin-left: 15%;
    align-items: center;
    text-align: center;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  .prod-container {
    font-size: 2rem;
    margin: 1rem;
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 1em;
    border-width: 2px;
    border-color: black;
    background-color: rgb(100, 116, 129);
  }
  .custom-button {
    margin: 4rem;
    font-size: 2rem;
    width: 60%;
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
