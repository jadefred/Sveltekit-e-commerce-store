import { writable } from 'svelte/store';
import type { IselectedProduct } from './interface';

//initial selected products in cart - empty array
export const selectedProducts = writable<IselectedProduct[]>([]);
