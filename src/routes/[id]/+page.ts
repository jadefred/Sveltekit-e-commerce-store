import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const id = params.id;

	if (id) {
		try {
			const response = await fetch(`https://fakestoreapi.com/products/${id}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	throw error(404, 'Not found');
};
