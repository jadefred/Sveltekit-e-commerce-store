<script lang="ts">
	//Types
	import type { PageData } from './$types';
	import type { IallProducts, IselectedProduct } from '../../interface';
	import { priceFormatter } from '../../utilities';
	import { selectedProducts } from '../../store';

	export let data: PageData;

	let products: IallProducts[] = data.allProducts;

	//click to increase quantity - by id
	function productIncrement(id: number) {
		let newArray = $selectedProducts;
		for (const item of newArray) {
			if (item.id == id) {
				item.quantity++;
			}
		}
		//update store
		selectedProducts.update(() => {
			return newArray;
		});
	}
	//click to derease quantity - by id
	function productDecrement(id: number) {
		let newArray = $selectedProducts;
		for (const item of newArray) {
			if (item.id == id && item.quantity > 1) {
				item.quantity--;
			}
		}
		//update store
		selectedProducts.update(() => {
			return newArray;
		});
	}
	//click to remove product from array completely
	function deleteProduct(id: number) {
		selectedProducts.update(() => {
			let newArray = $selectedProducts;
			newArray = newArray.filter((item) => item.id != id);
			return newArray;
		});
	}

	//Convert price string to number
	function strToNum(selected: IselectedProduct) {
		const priceStr = products.find((obj) => obj.id == selected.id)?.price;
		if (priceStr !== undefined) {
			return parseInt(priceStr, 10);
		}
		return 0;
	}

	//sum of quantity of all items in store (selectedProducts)
	$: totalQuantity = $selectedProducts.reduce((prev, curr) => prev + curr.quantity, 0);
	//1. (map) calcualte find the price of each item and time its quantity - array of each items' total price
	//2. (reduce) sum of all items price
	$: totalPrice = $selectedProducts
		.map((i) => {
			return strToNum(i) * i.quantity;
		})
		.reduce((prev, current) => prev + current, 0);
</script>

<h1 class="text-3xl font-semibold my-6 text-textBlack text-center">Cart</h1>

<!-- display product, total price and total quantity added to the cart if array is not empty -->
{#if $selectedProducts.length > 0}
	<div class="flex flex-col gap-y-2 text-textBlack">
		<!-- display all selected products -->
		{#each $selectedProducts as selected}
			<div
				class="flex w-11/12 lg:w-9/12 mx-auto bg-white border-2 border-blue-100 rounded-lg px-5 md:px-10 py-2 gap-x-5 md:gap-x-10"
			>
				<!-- get image and title by using 'find', compare by its id -->
				<div class="w-16 md:w-40 h-40">
					<img
						src={products.find((obj) => obj.id == selected.id)?.image}
						alt={products.find((obj) => obj.id == selected.id)?.title}
						class="w-16 md:w-40 h-40 object-contain"
					/>
				</div>
				<div class="flex flex-col justify-evenly w-full">
					<p class="font-semibold">
						{products.find((obj) => obj.id == selected.id)?.title}
					</p>
					<div class="flex gap-x-5 md:gap-x-20 items-center pl-0.5">
						<div class="flex gap-x-3">
							<!-- selected quantity, button for increment and decrement its quantity -->
							<button
								on:click={() => productIncrement(selected.id)}
								class="font-semibold text-lg hover:text-emerald-500 transition">+</button
							>
							<p class="text-xl">{selected.quantity}</p>
							<button
								on:click={() => productDecrement(selected.id)}
								class="font-semibold text-lg hover:text-red-500 transition">-</button
							>
						</div>
						<button
							on:click={() => deleteProduct(selected.id)}
							class="bg-red-400 text-white px-1 py-0.5 rounded hover:bg-red-500 transition"
							>Delete</button
						>
					</div>
				</div>
				<p class="self-center font-semibold text-lg">
					{priceFormatter.format(strToNum(selected) * selected.quantity)}
				</p>
			</div>
		{/each}

		<div class="w-11/12 lg:w-9/12 mx-auto pl-2 text-lg flex justify-evenly my-2">
			<p>Total Quantity : <span class="font-semibold">{totalQuantity}</span></p>
			<p>
				Total Price : <span class="font-semibold">{priceFormatter.format(totalPrice)}</span>
			</p>
		</div>
	</div>
{:else}
	<div class="flex flex-col items-center gap-y-20">
		<p class="text-xl">Empty Cart</p>
		<a
			href="/"
			class="bg-blue-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-blue-800 transition"
			>Back to Store</a
		>
	</div>
{/if}
