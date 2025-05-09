import './get-started';
import './verify-otp';
import './select-business-type';
import './basic-information';
import './owner-data';
import './main-product';
import './current-sales';
import './bank-account';
import './select-hardware';
import './sign-agreement';

Cypress.Commands.add('submitForm', () => {
  cy.dataCy('form-submit-button').click();
});
