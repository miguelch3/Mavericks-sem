Cypress.Commands.add(
  'fillBasicInformationForm',
  ({
    name,
    phone,
    address,
    itinType,
    itinValue,
    dbaName,
    establishedDate,
    contactName,
    contactEmail,
  }) => {
    cy.dataCy('legal-name-input').clear().type(name);
    cy.dataCy('legal-phone-input').clear().type(phone);

    cy.dataCy('legal-address-main-address').clear().type(address.main);
    cy.dataCy('legal-address-second-address').clear().type(address.second);
    cy.dataCy('legal-address-city').clear().type(address.city);
    cy.selectOption('legal-address-state-select', address.state);
    cy.dataCy('legal-address-zip').clear().type(address.zip);

    cy.selectOption('business-tin-type-select', itinType);

    cy.dataCy('ssn-or-itin-input').clear().type(itinValue);
    cy.dataCy('dba-name-input').clear().type(dbaName);

    cy.fillCalendar('business-established-date-input', establishedDate);

    cy.dataCy('contact-name-input').clear().type(contactName);
    cy.dataCy('contact-email-input').clear().type(contactEmail);

    cy.submitForm();
  }
);
