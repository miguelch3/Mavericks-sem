Cypress.Commands.add('selectOption', (selector, optionText) => {
  // Click to open the dropdown
  cy.get(`[data-cy="${selector}"]`).then(($select) => {
    // Check if an option is selected by inspecting the .ant-select-selection-item
    const hasSelectedOption =
      $select.find('.ant-select-selection-item').length > 0;

    // Click the input inside the select component to open the dropdown
    cy.wrap($select).find('input').click({ force: hasSelectedOption });

    // Select the option
    cy.get('.ant-select-dropdown')
      .find('.ant-select-item-option')
      .contains(optionText)
      .click({ force: hasSelectedOption });
  });

  // Click outside to close the dropdown
  cy.get('body').click(0, 0);

  // Verify the selection
  cy.get(`[data-cy="${selector}"]`).should('contain', optionText);
});

Cypress.Commands.add('selectMultipleOptions', (selector, options) => {
  // Click to open the dropdown
  cy.get(`[data-cy="${selector}"]`).then(($select) => {
    // Click the input inside the select component to open the dropdown
    cy.wrap($select).find('input').click({ force: true });

    // Ensure the dropdown is visible
    cy.get('.ant-select-dropdown').should('be.visible');

    options.forEach((optionText) => {
      // Find the option inside the dropdown
      cy.get('.rc-virtual-list-holder-inner')
        .find('.ant-select-item-option')
        .contains(optionText)
        .then(($option) => {
          // Check if the option is already selected
          const isSelected = $option
            .closest('.ant-select-item-option')
            .hasClass('ant-select-item-option-selected');

          // Only click the option if it's not already selected
          if (!isSelected) {
            cy.wrap($option).scrollIntoView().click({ force: true });
          }
        });
    });

    // Click outside to close the dropdown
    cy.get('body').click(0, 0);

    // Verify all selections
    options.forEach((optionText) => {
      cy.get(`[data-cy="${selector}"]`).should('contain', optionText);
    });
  });
});

Cypress.Commands.add('fillOTP', (selector, value) => {
  cy.dataCy(selector).within(() => {
    // Fill out each input field
    value.split('').forEach((digit, index) => {
      cy.get(`input`).eq(index).type(digit);
    });
  });
});

Cypress.Commands.add('fillCalendar', (selector, value) => {
  cy.dataCy(selector).clear().type(value);
  cy.get('body').click(0, 0);
});

Cypress.Commands.add(
  'clickCheckbox',
  (selector, { onlyIfChecked, onlyIfNotChecked }) => {
    cy.dataCy(selector).then(($checkbox) => {
      // Determine the current state of the checkbox
      const currentlyChecked = $checkbox.find('input').is(':checked');
      cy.log(`Checkbox Checked: ${currentlyChecked}`); // Debugging line

      // Decide whether to click based on the desired state
      if (onlyIfChecked && currentlyChecked) {
        cy.wrap($checkbox).click(); // Click check if its already checked
      } else if (onlyIfNotChecked && !currentlyChecked) {
        cy.wrap($checkbox).click(); // Click check if not already checked
      } else {
        cy.wrap($checkbox).click(); // Click in any case
      }
    });
  }
);

Cypress.Commands.add('clickIfFound', (selector) => {
  cy.get('body', { timeout: 2000 }).then(($body) => {
    // Check if the button exists
    if ($body.find(`[data-cy="${selector}"]`).length) {
      // If the button exists, click it
      cy.dataCy(selector).click();
    } else {
      // Log or handle the case where the button does not exist
      cy.log(`Element ${selector} does not exist`);
    }
  });
});

Cypress.Commands.add('dataCy', (value, { timeout } = {}) => {
  return cy.get(`[data-cy="${value}"]`, timeout ? { timeout } : {});
});
