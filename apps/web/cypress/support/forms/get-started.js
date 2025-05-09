Cypress.Commands.add('fillGetStartedForm', ({ phone }) => {
  cy.dataCy('get-started-phone-input').clear().type(phone);
  cy.submitForm();
});
