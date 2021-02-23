/* eslint-disable no-plusplus */
/* eslint-disable jest/expect-expect */
// eslint-disable-next-line jest/no-export
export {};

it('should add banana to cart and add free shipping coupon', () => {
  cy.visit('http://localhost:3000/');

  cy.reload();

  cy.get('#btnBanana').should('have.text', 'ADD TO CART');
  cy.get('#btnBanana').click();

  cy.get('body').then($body => {
    if ($body.find('onCartBanana')) {
      cy.get('incrementBanana').click();
    }
  });
});
