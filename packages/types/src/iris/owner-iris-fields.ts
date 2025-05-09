import type { OwnerAuthorityOptions } from './owner-authority';
import type { OwnerIndex } from './owner-index';

type AuthorityFormIds = Record<OwnerAuthorityOptions, string>;

type OwnerFieldIds = {
  firstName: string;
  lastName: string;
  middleName: string;
  jobTitle: string;
  authority: AuthorityFormIds;
  ownershipPercentage: string;
  email: string;
  dateOfBirth: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPhone: string;
};

export type OwnerFormKeyDef = Record<OwnerIndex, OwnerFieldIds>;

export const StagingOwnerFieldKeys: OwnerFormKeyDef = {
  ownerOne: {
    firstName: '47',
    lastName: '4361',
    middleName: '6474',
    jobTitle: '49',
    authority: {
      'Authorized Signer': '6413',
      'Manager/Controller': '6412',
      'Personal Guarantee': '6414',
      'Authorized Contact': '7669',
    },
    ownershipPercentage: '50',
    email: '5945',
    dateOfBirth: '4487',
    ssn: '4489',
    address: '51',
    city: '52',
    state: '53',
    zipCode: '54',
    contactPhone: '6418',
  },
  ownerTwo: {
    firstName: '3608',
    lastName: '4349',
    middleName: '7377',
    jobTitle: '3610',
    authority: {
      'Authorized Signer': '6416',
      'Manager/Controller': '6415',
      'Personal Guarantee': '6417',
      'Authorized Contact': '7670',
    },
    ownershipPercentage: '3611',
    email: '4815',
    dateOfBirth: '4488',
    ssn: '4490',
    address: '3612',
    city: '3613',
    state: '3614',
    zipCode: '3615',
    contactPhone: '6419',
  },
  ownerThree: {
    firstName: '4813',
    lastName: '4812',
    middleName: '7378',
    jobTitle: '4810',
    authority: {
      'Authorized Signer': '6424',
      'Manager/Controller': '6423',
      'Personal Guarantee': '6425',
      'Authorized Contact': '7671',
    },
    ownershipPercentage: '4811',
    email: '5944',
    dateOfBirth: '4803',
    ssn: '4802',
    address: '4808',
    city: '4807',
    state: '4806',
    zipCode: '4805',
    contactPhone: '7534',
  },
  ownerFour: {
    firstName: '4800',
    lastName: '4799',
    middleName: '7379',
    jobTitle: '4797',
    authority: {
      'Authorized Signer': '6421',
      'Manager/Controller': '6420',
      'Personal Guarantee': '6422',
      'Authorized Contact': '7672',
    },
    ownershipPercentage: '4798',
    email: '5943',
    dateOfBirth: '4790',
    ssn: '4789',
    address: '4795',
    city: '4794',
    state: '4793',
    zipCode: '4792',
    contactPhone: '7536',
  },
} as const;

export const ProductionOwnerFieldKeys: OwnerFormKeyDef = {
  ownerOne: {
    firstName: '47',
    lastName: '4361',
    middleName: '6474',
    jobTitle: '49',
    authority: {
      'Authorized Signer': '6413',
      'Manager/Controller': '6412',
      'Personal Guarantee': '6414',
      'Authorized Contact': '7617',
    },
    ownershipPercentage: '50',
    email: '5945',
    dateOfBirth: '4487',
    ssn: '4489',
    address: '51',
    city: '52',
    state: '53',
    zipCode: '54',
    contactPhone: '6418',
  },
  ownerTwo: {
    firstName: '3608',
    lastName: '4349',
    middleName: '6892',
    jobTitle: '3610',
    authority: {
      'Authorized Signer': '6416',
      'Manager/Controller': '6415',
      'Personal Guarantee': '6417',
      'Authorized Contact': '7618',
    },
    ownershipPercentage: '3611',
    email: '4815',
    dateOfBirth: '4488',
    ssn: '4490',
    address: '3612',
    city: '3613',
    state: '3614',
    zipCode: '3615',
    contactPhone: '6419',
  },
  ownerThree: {
    firstName: '4813',
    lastName: '4812',
    middleName: '6893',
    jobTitle: '4810',
    authority: {
      'Authorized Signer': '6424',
      'Manager/Controller': '6423',
      'Personal Guarantee': '6425',
      'Authorized Contact': '7619',
    },
    ownershipPercentage: '4811',
    email: '5944',
    dateOfBirth: '4803',
    ssn: '4802',
    address: '4808',
    city: '4807',
    state: '4806',
    zipCode: '4805',
    contactPhone: '6968',
  },
  ownerFour: {
    firstName: '4800',
    lastName: '4799',
    middleName: '6894',
    jobTitle: '4797',
    authority: {
      'Authorized Signer': '6421',
      'Manager/Controller': '6420',
      'Personal Guarantee': '6422',
      'Authorized Contact': '7616',
    },
    ownershipPercentage: '4798',
    email: '5943',
    dateOfBirth: '4790',
    ssn: '4789',
    address: '4795',
    city: '4794',
    state: '4793',
    zipCode: '4792',
    contactPhone: '6969',
  },
} as const;
