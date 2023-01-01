import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('https://fakestoreapi.com/products');
	const data = await response.json();
	return { allProducts: data };
};
