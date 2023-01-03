describe('Delivery form', () => {
	const id = 1;

	it('Show delivery form when product is added to the cart', () => {
		//Delivery form should NOT exist before product is added to the card
		cy.visit('/cart');
		cy.get('[data-cy="formTitle"]').should('not.exist');
		//Delivery form should exist before product is added to the card
		cy.addToCart(`${id}`);
		cy.get('[data-cy="formTitle"]').should('contain', 'Delivery Details');
	});

	it('Fill in form information', () => {
		cy.addToCart(`${id}`);
		cy.get('input[name="firstName"]').type('first name');
		cy.get('input[name="lastName"]').type('last name');
		cy.get('input[name="address"]').type('address');
		cy.get('input[name="email"]').type('email@email.com');
		//click to submit
		cy.get('[data-cy="submitBtn"]').click();
		//wait for redirect
		cy.wait(2000);
		//get location pathname ("/cart/:confirmationID"), use slice to get id and compare with the id in confirmation page
		cy.location().then((loc) => {
			cy.get('[data-cy="confirmationId"]').should('contain', loc.pathname.slice(6));
		});
	});

	it('Show error message', () => {
		cy.addToCart(`${id}`);
		cy.get('[data-cy="submitBtn"]').click();
		cy.wait(1000);
		cy.get('[data-cy="firstNameErrorMsg"]').should((elem) => {
			expect(elem.text()).to.equal('Please fill in your first name');
		});
        cy.get('[data-cy="lastNameErrorMsg"]').should((elem) => {
			expect(elem.text()).to.equal('Please fill in your last name');
		});
        cy.get('[data-cy="addressErrorMsg"]').should((elem) => {
			expect(elem.text()).to.equal('Please fill in your address');
		});
        cy.get('[data-cy="emailErrorMsg"]').should((elem) => {
			expect(elem.text()).to.equal('Please fill in your email');
		});
	});

    it('Error message for invalid email', () => {
		cy.addToCart(`${id}`);
        //Invalid email address
        cy.get('input[name="email"]').type('email@aaa');
        //Submit form
		cy.get('[data-cy="submitBtn"]').click();
		cy.wait(1000);
		cy.get('[data-cy="emailInvalidMsg"]').should((elem) => {
			expect(elem.text()).to.equal('Invalid email');
		});
	});
});

export {};
