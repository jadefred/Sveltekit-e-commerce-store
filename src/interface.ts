interface IallProducts {
	id: number;
	title: string;
	price: string;
	category: string;
	description: string;
	image: string;
	rating: { rate: number; count: number };
}

interface IselectedProduct {
	id: number;
	quantity: number;
}

interface Iorder {
	userId: string;
	date: string;
	products: IselectedProduct[];
}

export type { IallProducts, IselectedProduct, Iorder };
