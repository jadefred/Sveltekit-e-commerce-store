<script lang="ts">
	import type { IallProducts } from '../../interface';
	import { selectedProducts } from '../../store';
	import { priceFormatter } from '../../utilities';

	export let data: IallProducts;

	let oneProduct = data;
	let addedToCartMsg = false;

	function addToCart(id: number) {
		//new selected product object
		let productInfo = {
			id: id,
			quantity: 1
		};
		//if added product is already have same model in tha cart, adjust quantity then update selected product store
		if ($selectedProducts.some((item) => item.id == id)) {
			let newArray = $selectedProducts;
			//loop through copied selected product array and modify the quantity
			for (const item of newArray) {
				if (item.id == id) {
					item.quantity++;
				}
			}
			selectedProducts.update(() => {
				return newArray;
			});
		}
		//if no repeated product, push the newly added product to state directly
		else {
			selectedProducts.update((item) => {
				return [...item, productInfo];
			});
		}
		//display flash message
		flashMessage();
	}

	//display flash massage for 3 seconds
	function flashMessage() {
		addedToCartMsg = true;
		setTimeout(() => {
			addedToCartMsg = false;
		}, 3000);
	}
</script>

<div
	class="mb-20 w-11/12 sm:w-4/6 md:w-2/4 mx-auto text-center text-textBlack flex flex-col gap-y-5 bg-white p-5 mt-10 rounded-lg border-2 border-blue-100"
>
	<h2 class="font-bold text-2xl">{oneProduct.title}</h2>
	<img src={oneProduct.image} alt={oneProduct.title} class="w-10/12 md:w-2/4 mx-auto" />
	<p class="w-10/12 mx-auto text-justify">{oneProduct.description}</p>

	<!-- make added to cart message visible after added product -->
	<div class={`${addedToCartMsg ? 'text-sky-600 visible' : 'invisible'}`}>
		Product has been added to the cart
	</div>

	<!-- price and add to cart button block -->
	<div class="w-10/12 mx-auto flex justify-around items-center">
		<p class="font-bold text-xl">Price : {priceFormatter.format(parseInt(oneProduct.price, 10))}</p>
		<button
			on:click={() => addToCart(oneProduct.id)}
			class="font-bold text-xl bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition"
			>Add to Cart</button
		>
	</div>
</div>
