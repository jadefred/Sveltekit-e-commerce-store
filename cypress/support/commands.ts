Cypress.Commands.add('loadOneProduct', (id) => {
	cy.request(`https://fakestoreapi.com/products/${id}`)
});

export {};
