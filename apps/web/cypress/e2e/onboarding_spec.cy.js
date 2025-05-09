describe('Forms flow test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Fills and submits the get started form', () => {
    // Form 1 (Register Number)
    cy.fillGetStartedForm({ phone: '7187570498' });

    // Form 2 (Send OTP)
    cy.fillOTPForm({ otp: '9999' });

    // Form 3 (Business Type)
    cy.fillBusinessTypeForm({ type: 'Corporation' });

    // Form 4 (Basic Information)
    cy.fillBasicInformationForm({
      name: 'Test Business',
      phone: '1122334333',
      address: {
        main: '123 Main St',
        second: 'Apt 1',
        city: 'San Francisco',
        state: 'California',
        zip: '10001',
      },
      itinType: 'SSN',
      itinValue: '123456788',
      dbaName: 'DBA Name Test',
      establishedDate: '02/2000',
      contactName: 'Test Name',
      contactEmail: 'mail@test.com',
    });

    // Form 5 (Main Representative)
    cy.fillOwnerDataForm({
      name: {
        first: 'John',
        middle: 'Doe',
        last: 'Smith',
      },
      jobTitle: 'CEO',
      authorities: ['Authorized Signer'],
      ownership: '50',
      email: 'johndoe@email.com',
      birthDate: '01/01/1980',
      address: {
        main: '222 Main St',
        second: 'Apt 202',
        city: 'Los Angeles',
        state: 'California',
        zip: '10001',
      },
      ssn: '123456789',
      contactPhone: '1122334455',
    });

    // Form 6 (Another Owner)
    cy.clickIfFound('jefferson-smith-pot-delete-button');
    cy.dataCy('add-owner-button').click();

    cy.fillOwnerDataForm({
      name: {
        first: 'Jefferson',
        middle: 'Smith',
        last: 'Pot',
      },
      jobTitle: 'Owner',
      authorities: ['Personal Guarantee'],
      ownership: '20',
      email: 'jeff@email.com',
      birthDate: '01/01/1979',
      address: {
        main: '111 Main St',
        second: 'Apt 101',
        city: 'Los Angeles',
        state: 'California',
        zip: '10001',
      },
      ssn: '123456789',
      contactPhone: '1122334455',
    });

    cy.submitForm();

    // Form 7 (Main product)
    cy.fillMainProductForm({
      description: 'Books & More',
      category: 'Retail',
      subcategory: 'Book Stores',
      website: 'www.electro.com',
    });

    // Form 9 (Current sales)
    cy.fillCurrentSalesForm({
      monthly: '20000',
      ticket: '12000',
      highest: '5000',
      amexMonthly: '4000',
      amexTicket: '2000',
      cardPercentage: '25',
      motoPercentage: '20',
      onlinePercentage: '55',
    });

    // Form 10 (Bank Account)
    cy.fillBankAccountForm({
      bankName: 'Test Bank',
      routingNumber: '123456789',
      accountNumber: '1122334455',
      accountNumberConfirm: '1122334455',
      accountHolder: 'John Doe',
    });

    // Form 11 (Confirm info)
    cy.submitForm();

    // Form 12 (Device selection)
    cy.fillSelectHardwareForm({
      qty: '1',
    });

    // Form 13 (Fees)
    cy.submitForm();

    // Form 14 (Sign Agreement)
    cy.fillSignAgreementForm();
  });
});
