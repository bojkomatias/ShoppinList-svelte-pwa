<script>
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	// import {db} from './db.js'
	// let todos = []
	// let desciptionText = "";

	// db.collection("ShoppingList").onSnapshot(snapData => {
	// 	todos = snapData.docs
	// });

	// function add() {
	// 	db.collection("ShoppingList").add({done: false, description: desciptionText});
	// }

	// function remove(itemId){
	// 	db.collection("ShoppingList").doc(itemId).delete();
	// }
	

	let todos = [
		{ id: 1, done: false, description: 'milk' },
		{ id: 2, done: false, description: 'butter' },
		{ id: 3, done: false, description: 'cheese' },
	];

	let uid = todos.length + 1;

	function add(input) {
		const todo = {
			id: uid++,
			done: false,
			description: input.value
		};

		todos = [todo, ...todos];
		input.value = '';
	}

	function remove(todo) {
		todos = todos.filter(t => t !== todo);
	}
</script>

<div class="container">
	<br>
	<h1>Shopping list</h1>

	<div class=''>
		<input
			class="new-todo"
			placeholder="Add new item"
			on:keydown="{event => event.key === 'Enter' && add(event.target)}"
		>
	
		<div class=''>
			<h2>To buy</h2>
			{#each todos.filter(t => !t.done) as todo (todo.id)}
				<label
					in:receive="{{key: todo.id}}"
					out:send="{{key: todo.id}}"
					animate:flip
				>
					<input type=checkbox bind:checked={todo.done}>
					{todo.description}
					<button on:click="{() => remove(todo)}">x</button>
				</label>
			{/each}
		</div>
	
		<div class='done'>
			<h2>Bought</h2>
			{#each todos.filter(t => t.done) as todo (todo.id)}
				<label
					in:receive="{{key: todo.id}}"
					out:send="{{key: todo.id}}"
					animate:flip
				>
					<input type=checkbox bind:checked={todo.done}>
					{todo.description}
					<button on:click="{() => remove(todo)}">x</button>
				</label>
			{/each}
		</div>
	</div>
</div>

<style>
	.new-todo {
		font-size: 1.4em;
		width: 100%;
		margin: 2em 0 1em 0;
		border: solid 1px;
    	padding: 5px;
    	border-color: #dcdada;
	}

	h2 {
		font-size: 2em;
		font-weight: 200;
		user-select: none;
	}

	label {
		top: 0;
		left: 0;
		display: block;
		font-size: 1em;
		line-height: 1;
		padding: 0.5em;
		margin: 0 auto 0.5em auto;
		border-radius: 2px;
		background-color: #eee;
		user-select: none;
		text-align: initial;
	}

	input { margin: 0 }

	.done label {
		background-color: rgb(180,240,100);
	}

	button {
		float: right;
		height: 1em;
		box-sizing: border-box;
		padding: 0 0.5em;
		line-height: 1;
		background-color: transparent;
		border: none;
		color: rgb(170,30,30);
		/*opacity: 0;*/
		transition: opacity 0.2s;
	}

	/*label:hover button {
		opacity: 1;
	}*/
	

	h1 {
		font-size: revert;
	}

	.container {
		align-items: center;
		text-align: center;
		width: 70%;
		margin-left: 15%;
	}
</style>