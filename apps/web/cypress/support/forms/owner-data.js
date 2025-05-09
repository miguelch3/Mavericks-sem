Cypress.Commands.add(
  'fillOwnerDataForm',
  ({
    name,
    jobTitle,
    authorities,
    ownership,
    email,
    birthDate,
    address,
    ssn,
    contactPhone,
  }) => {
    cy.dataCy('owner-first-name-input').clear().type(name.first);
    cy.dataCy('owner-last-name-input').clear().type(name.last);
    cy.dataCy('owner-middle-name-input').clear().type(name.middle);

    cy.selectOption('owner-job-title-select', jobTitle);
    cy.selectMultipleOptions('owner-authority-select', authorities);

    cy.dataCy('owner-ownership-percentage-input').clear().type(ownership);
    cy.dataCy('owner-email-input').clear().type(email);
    cy.fillCalendar('owner-birth-date-input', birthDate);

    cy.dataCy('owner-home-main-address').type(address.main);
    cy.dataCy('owner-home-second-address').clear().type(address.second);
    cy.dataCy('owner-home-city').clear().type(address.city);
    cy.selectOption('owner-home-state-select', address.state);
    cy.dataCy('owner-home-zip').clear().type(address.zip);

    cy.dataCy('owner-ssn-input').clear().type(ssn);
    cy.dataCy('owner-contact-phone-input').clear().type(contactPhone);

    cy.submitForm();
  }
);
