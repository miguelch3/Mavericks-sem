Cypress.Commands.add('fillSignAgreementForm', () => {
  cy.dataCy('waiting-agreement-signed-button', { timeout: 600000 }).should(
    'be.enabled'
  );
  cy.clickCheckbox('reviewed-merchant-agreement-checkbox', {
    onlyIfNotChecked: true,
  });
  cy.clickCheckbox('agreed-company-terms-checkbox', {
    onlyIfNotChecked: true,
  });
  cy.clickCheckbox('reviewed-merchant-application-pages-checkbox', {
    onlyIfNotChecked: true,
  });

  cy.submitForm();
});
