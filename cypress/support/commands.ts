Cypress.Commands.add('loadOneProduct', (id) => {
	cy.request(`https://fakestoreapi.com/products/${id}`);
});

Cypress.Commands.add('addToCart', (id) => {
	cy.visit(`/${id}`);
	cy.get('[data-cy="addToCartBtn"]').trigger('mouseover').click();
	cy.get('[data-cy="navBar"]').find('a').eq(1).click();
	cy.url().should('equal', 'http://localhost:5173/cart');
});

export {};
