describe('Cart', () => {
	const id = 1;

	const priceFormatter = new Intl.NumberFormat('fr-FR', {
		style: 'currency',
		currency: 'EUR'
	});

	it('empty cart', () => {
		cy.visit('/cart');
		cy.get('h1').should('contain', 'Cart');
		cy.get('[data-cy="emptyCart"]').find('p').should('contain', 'Empty Cart');
	});

	it('empty cart back to home page', () => {
		cy.visit('/cart');
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

	it('show selected product card in the cart', () => {
		cy.addToCart(`${id}`);
		cy.loadOneProduct(`${id}`).then((res) => {
			cy.get('[data-cy="selectedTitle"]').should('contain', res.body.title);
			cy.get('[data-cy="selectedImg"]').should('have.attr', 'src').and('equal', res.body.image);
			cy.get('[data-cy="selectedQuantity"]').should('contain', '1');
			cy.get('[data-cy="selectedPrice"]').should(
				'contain',
				priceFormatter.format(Math.floor(parseInt(res.body.price)))
			);
		});
	});

	it('add selected product quantity and check price change in card', () => {
		cy.addToCart(`${id}`);
		//Product add 1
		cy.get('[data-cy="addQuantity"]').click();
		//Product quantity = 2
		cy.get('[data-cy="selectedQuantity"]').should('contain', '2');
		//Check price update
		cy.loadOneProduct(`${id}`).then((res) => {
			cy.get('[data-cy="selectedPrice"]').should(
				'contain',
				priceFormatter.format(Math.floor(parseInt(res.body.price) * 2))
			);
		});
	});

	it('minus selected product quantity and check price change in card', () => {
		cy.addToCart(`${id}`);
		//Product add 1
		//Product quantity = 2
		cy.get('[data-cy="addQuantity"]').click();
		//Product minus 1 => Quantity = 1
		cy.get('[data-cy="minusQuantity"]').click();
		cy.get('[data-cy="selectedQuantity"]').should('contain', '1');
		//Check price update
		cy.loadOneProduct(`${id}`).then((res) => {
			cy.get('[data-cy="selectedPrice"]').should(
				'contain',
				priceFormatter.format(Math.floor(parseInt(res.body.price) * 1))
			);
		});
	});

	it('Quantity of product should not below 1', () => {
		cy.addToCart(`${id}`);
		//Click minus button when product quantity is 1
		cy.get('[data-cy="minusQuantity"]').click();
		cy.get('[data-cy="selectedQuantity"]').should('contain', '1');
		//Check price
		cy.loadOneProduct(`${id}`).then((res) => {
			cy.get('[data-cy="selectedPrice"]').should(
				'contain',
				priceFormatter.format(Math.floor(parseInt(res.body.price) * 1))
			);
		});
	});

	it('Delete selected product', () => {
		cy.addToCart(`${id}`);
		cy.get('[data-cy="deleteBtn"]').click();
		cy.get('[data-cy="emptyCart"]').find('p').should('contain', 'Empty Cart');
	});

	it('Total quantity update accordingly', () => {
		//Add one product to the cart => add 1 => minus 1
		cy.addToCart(`${id}`);
		cy.get('[data-cy="totalQuantity"]').should('contain', '1');
		cy.get('[data-cy="addQuantity"]').click();
		cy.get('[data-cy="totalQuantity"]').should('contain', '2');
		cy.get('[data-cy="minusQuantity"]').click();
		cy.get('[data-cy="totalQuantity"]').should('contain', '1');
	});

	it('Total price update accordingly', () => {
		//Add one product to the cart => add 1 => minus 1
		cy.addToCart(`${id}`);
		cy.loadOneProduct(`${id}`).then((res) => {
			cy.get('[data-cy="selectedPrice"]').should(
				'contain',
				priceFormatter.format(Math.floor(parseInt(res.body.price) * 1))
			);
		});
		cy.get('[data-cy="addQuantity"]').click();
		cy.loadOneProduct(`${id}`).then((res) => {
			cy.get('[data-cy="selectedPrice"]').should(
				'contain',
				priceFormatter.format(Math.floor(parseInt(res.body.price) * 2))
			);
		});
		cy.get('[data-cy="minusQuantity"]').click();
		cy.loadOneProduct(`${id}`).then((res) => {
			cy.get('[data-cy="selectedPrice"]').should(
				'contain',
				priceFormatter.format(Math.floor(parseInt(res.body.price) * 1))
			);
		});
	});
});

export {};
