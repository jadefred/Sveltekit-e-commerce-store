describe('Home page', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('successfully loads', () => {
		cy.get('h1').should('contain', 'All Products');
	});

	it('get all product cards', () => {
		cy.request('https://fakestoreapi.com/products').then((res) => {
			//data-cy is added in component to get a element
			cy.get('[data-cy="productCards"]').find('a').should('have.length', res.body.length);
			cy.log(`${res.body.length}`);
		});
	});

	it('product card shows correct data', () => {
		cy.request('https://fakestoreapi.com/products').then((res) => {
			//get the first card and compare to the data
			cy.get('[data-cy="productCards"]').find('p').first().should('have.text', res.body[0].title);
			cy.get('[data-cy="productCards"]')
				.find('img')
				.first()
				.should('have.attr', 'src')
				.and('equal', res.body[0].image);
		});
	});

	it('click product card to navigate to the product details page', () => {
		cy.request('https://fakestoreapi.com/products').then((res) => {
			cy.get('[data-cy="productCards"]').find('a').first().click();
			cy.url().should('include', res.body[0].id);
		});
	});
});

export {};
