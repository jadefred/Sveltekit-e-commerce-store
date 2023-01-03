import type { IallProducts } from '../support/index';

describe('Cart', () => {
	const id = 1;

	beforeEach(() => {
		cy.visit('cart');
	});

	it('empty cart', () => {
		cy.get('h1').should('contain', 'Cart');
		cy.get('[data-cy="emptyCart"]').find('p').should('contain', 'Empty Cart');
	});

	it('empty cart back to home page', () => {
		cy.get('[data-cy="emptyCart"]').find('a').click();
		cy.url().should('equal', 'http://localhost:5173/');
	});

	it('add selected product to the cart', () => {
		//navigate to product page and add product to the cart
		cy.visit(`/${id}`);
		cy.get('[data-cy="addToCartBtn"]').trigger('mouseover').click();
		cy.get('[data-cy="navBar"]').find('a').eq(1).click();
		cy.url().should('equal', 'http://localhost:5173/cart');
	});

	it('show selected product in the cart', () => {
		cy.addToCart(`${id}`);
		cy.loadOneProduct(`${id}`).then((res) => {
			cy.get('[data-cy="selectedTitle"]').should('contain', res.body.title);
		});
		
	});
});

export {};
