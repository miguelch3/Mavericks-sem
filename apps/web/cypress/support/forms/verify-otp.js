Cypress.Commands.add('fillOTPForm', ({ otp }) => {
  cy.fillOTP('verification-code-input', otp);
  cy.submitForm();
});
