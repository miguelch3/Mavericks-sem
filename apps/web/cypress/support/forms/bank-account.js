Cypress.Commands.add(
  'fillBankAccountForm',
  ({
    bankName,
    routingNumber,
    accountNumber,
    accountNumberConfirm,
    accountHolder,
  }) => {
    cy.dataCy('bank-name-input').clear().type(bankName);
    cy.dataCy('routing-number-input').clear().type(routingNumber);
    cy.dataCy('account-number-input').clear().type(accountNumber);
    cy.dataCy('account-number-confirm-input')
      .clear()
      .type(accountNumberConfirm);
    cy.dataCy('account-holder-input').clear().type(accountHolder);

    cy.submitForm();
  }
);
