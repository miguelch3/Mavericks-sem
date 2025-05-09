Cypress.Commands.add('fillBusinessTypeForm', ({ type }) => {
  cy.selectOption('business-type-select', type);
  cy.submitForm();
});
