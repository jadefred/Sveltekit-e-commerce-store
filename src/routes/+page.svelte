<script lang="ts">
	import type { PageData } from './$types';
	import type { IallProducts } from '../interface';

	export let data: PageData;

	let allProducts: IallProducts[] = data.allProducts;
</script>

<div class="text-gray-700 bg-blue-50">
	<div class="w-11/12 mx-auto text-center">
		<h1 class="text-3xl font-bold py-8">All Products</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 justify-items-center" data-cy="productCards">
			<!-- display all products dynamically, each card is a clickable link which link to its url page -->
			{#each allProducts as product}
				<a
					href={`/${product.id}`}
					class="flex flex-col items-center gap-y-3 w-5/6 border-2 border-blue-100 bg-white rounded-lg
				p-5 hover:scale-105 transition-transform"
				>
					<p class="font-semibold text-xl">{product.title}</p>
					<div class="bg-white">
						<img src={product.image} alt={product.title} class="w-60 h-80 object-contain mx-auto" />
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
