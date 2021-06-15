<script>
  import Navbar from "./Navbar.svelte";
  import Sidebar from "./Sidebar.svelte";

  import { Router, Route, Link } from "svelte-routing";
  import About from "./About.svelte";
  import Fallback from "./Fallback.svelte";
  import ShoppingList from "./ShoppingList.svelte";

  import ProductView from "./ProductView.svelte";

  let open = false;
</script>

<Sidebar bind:open />
<Navbar bind:sidebar={open} />

<svelte:head>
  <link
    href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
    rel="stylesheet"
  />
</svelte:head>

<Router>
  <div>
    <Route path="/" component={ShoppingList} />
    <Route path="/About" component={About} />
    <Route path="/Fallback" component={Fallback} />
    <Route path="/product/:id" component={ProductView} />
  </div>
</Router>

<style>
  :global(body) {
    padding: 0;
  }
</style>
