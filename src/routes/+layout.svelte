<script>
	import '../app.css';
</script>

<nav class="flex gap-5 bg-blue-500 text-white font-bold text-2xl py-2 pl-10">
	<a href="/">Home</a>
	<a href="/cart">Cart</a>
</nav>
<slot />

<footer class="flex gap-5 bg-blue-500 text-white text-md py-2 pl-10 mt-5 fixed bottom-0 w-full">
	<p>
		Products' information from <a href="https://fakestoreapi.com/" class="underline"
			>Fake Store API</a
		>
	</p>
</footer>
