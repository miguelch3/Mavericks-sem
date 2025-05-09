Cypress.Commands.add('fillSelectHardwareForm', ({ qty }) => {
  cy.selectOption('dejavoo-qd3-qty-select', qty);
  cy.submitForm();
});
