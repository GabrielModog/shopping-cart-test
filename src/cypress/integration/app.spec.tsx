/* eslint-disable jest/expect-expect */
// eslint-disable-next-line jest/no-export
export {};

it('should work', () => {
  cy.visit('http://localhost:3000/');
  cy.get('#title').should('have.text', 'Shop It');
});
