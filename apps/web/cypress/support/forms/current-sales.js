Cypress.Commands.add(
  'fillCurrentSalesForm',
  ({
    monthly,
    ticket,
    highest,
    amexMonthly,
    amexTicket,
    cardPercentage,
    motoPercentage,
    onlinePercentage,
  }) => {
    cy.dataCy('average-monthly-sales-input').clear().type(monthly);
    cy.dataCy('average-ticket-value-input').clear().type(ticket);
    cy.dataCy('highest-amount-to-date-input').clear().type(highest);

    cy.clickCheckbox('amex-volumes-same-checkbox', { onlyIfChecked: true });
    cy.dataCy('average-amex-monthly-sales-input').clear().type(amexMonthly);
    cy.dataCy('average-amex-ticket-value').clear().type(amexTicket);

    cy.dataCy('card-swipe-input').clear().type(cardPercentage);
    cy.dataCy('moto-input').clear().type(motoPercentage);
    cy.dataCy('online-input').clear().type(onlinePercentage);

    cy.submitForm();
  }
);
