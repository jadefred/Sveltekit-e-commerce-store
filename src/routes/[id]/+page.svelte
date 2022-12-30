<script lang="ts">
	import type { IallProducts } from '../../interface';

	export let data: IallProducts;

	let oneProduct = data;
</script>

<h1>{oneProduct.id}</h1>
<p>{oneProduct.title}</p>
