describe('Product details page', () => {
	const id = '1';

	const priceFormatter = new Intl.NumberFormat('fr-FR', {
		style: 'currency',
		currency: 'EUR'
	});

	beforeEach(() => {
		cy.visit(`/${id}`);
	});

	it('Load product data', () => {
		cy.loadOneProduct(id).then((res) => {
			cy.get('h2').should('contain', res.body.title);
			cy.get('img').should('have.attr', 'src').and('equal', res.body.image);
			cy.get('p').eq(0).should('contain', res.body.description);
			cy.get('p').eq(1).should('contain', priceFormatter.format(Math.floor(parseInt(res.body.price))));
		});
	});
});

export {};
