<script>
  export let collection;
  const searchOffer = async () => {
    const res = await fetch(
      `https://pouncing-mire-firewall.glitch.me/sales/20`
    );
    const response = await res.json();
    collection = response.data;
  };
</script>

<div class="container">
  <button on:click={searchOffer}> Black Friday (20% Off) </button>
  <div>
    {#if !!collection}
      {#each collection as { data, link }}
        <div>
          <pre>{link}</pre>
          <div>{data.productName}</div>
          <div>{data.category}</div>
          <div>U$D : {data.price}</div>
          <div>Stock: {data.stock}</div>
          {#if link}<a href={link}><button>Comprar</button></a>
          {/if}

          <!-- {#if link}<Link to={link}><button>Comprar</button></Link>
						{/if} -->
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .container {
    align-items: center;
    text-align: center;
    width: 70%;
    margin-left: 15%;
  }
</style>
