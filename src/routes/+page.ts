import type { PageLoad } from './$types';
//import axios from 'axios';

// export const load: PageLoad = async () => {
// 	const response = await axios.get('https://fakestoreapi.com/products', {
// 		headers: { 'Accept-Encoding': 'gzip,deflate,compress' } //AxiosError: unexpected end of file, add this heading to bypass the error
// 	});
// 	return response;
// };

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('https://fakestoreapi.com/products');
	const data = await response.json();
	return { allProducts: data };
};
