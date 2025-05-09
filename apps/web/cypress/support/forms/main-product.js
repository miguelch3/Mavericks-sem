Cypress.Commands.add(
  'fillMainProductForm',
  ({ description, category, subcategory, website }) => {
    cy.dataCy('product-description-input').clear().type(description);
    cy.wait(1000); // We need to wait until async mapping is done
    cy.selectOption('product-category-select', category);
    cy.selectOption('product-subcategory-select', subcategory);
    cy.dataCy('website-input').clear().type(website);
    cy.submitForm();
  }
);
