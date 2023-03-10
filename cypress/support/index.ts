//Add command to the global Cypress Chainable interface
export interface IallProducts {
	find(arg0: (obj: IallProducts) => boolean): unknown;
	id: number;
	title: string;
	price: string;
	category: string;
	description: string;
	image: string;
	rating: { rate: number; count: number };
}

declare global {
	namespace Cypress {
		interface Chainable {
			loadOneProduct(value: string): Chainable<Response<IallProducts>>;
			addToCart(id: string): Chainable<Element>;
		}
	}
}

export {};
