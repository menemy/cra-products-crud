// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

context('Products Cypress test', () => {
  beforeEach(() => {
    // usually we recommend setting baseUrl in cypress.json
    // but for simplicity of this example we just use it here
    // https://on.cypress.io/visit
    cy.visit('');
  });

  it('adds product', function () {
    cy.get('.js-add').click();
    cy.location().should((loc) => {
      expect(loc.href).to.include('/add');
    });
    cy.get('#name')
      .type('My product')
      .tab()
      .type('3')
      .tab()
      .click()
      .tab()
      .type('3')
      .tab()
      .type('2020-10-10')
      .tab()
      .type('My brand')
      .tab()
      .select(['Watches', 'Phones'])
      .tab()
      .type('2020-10-10');
    cy.screenshot()
    cy.get('form').submit();
    cy.get('.js-product').should('have.length', 4);
  });

  it('adds product validation', function () {
    cy.get('.js-add').click();
    cy.location().should((loc) => {
      expect(loc.href).to.include('/add');
    });
    cy.get('#name')
      .parent()
      .find('.invalid-feedback')
      .should('not.exist');

    cy.get('#rating')
      .parent()
      .find('.invalid-feedback')
      .should('not.exist');

    cy.get('#categories')
      .parent()
      .find('.invalid-feedback')
      .should('not.exist');

    cy.get('form').submit();

    cy.get('#name')
      .parent()
      .find('.invalid-feedback')
      .should('exist');

    cy.get('#rating')
      .parent()
      .find('.invalid-feedback')
      .should('exist');

    cy.get('#categories')
      .parent()
      .find('.invalid-feedback')
      .should('exist');
    cy.screenshot()
  });

  it('update product', function () {
    cy.get('.js-product')
      .eq(2)
      .find('.js-edit')
      .click()
    cy.location().should((loc) => {
      expect(loc.href).to.include('/edit/3');
    });
    cy.screenshot()
    cy.get('#name')
      .type('{selectall}{del}Product_changed')
    cy.get('form').submit();
    cy.get('.js-product')
      .eq(2)
      .find('.js-card-name')
      .should('have.text', 'Product_changed');
  });

  it('delete product', function () {
    cy.get('.js-product')
      .eq(1)
      .find('.js-delete-product')
      .click()
    cy.get('.js-delete-modal-confirm').click();
    cy.screenshot()
    cy.get('.js-product').should('have.length', 2);
  });
});
