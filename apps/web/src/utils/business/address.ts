import type { Address, DbaAddress, LegalAddress } from '@mavericks/types';
import {
  AddressSchema,
  DbaAddressSchema,
  LegalAddressSchema,
  stateLabels,
} from '@mavericks/types';

import { APIFieldKey } from '@/common-types/form';

export const areAddressEqual = (
  address1: Address,
  address2: Address
): boolean => {
  return (
    address1.addressOne === address2.addressOne &&
    address1.addressTwo === address2.addressTwo &&
    address1.city === address2.city &&
    address1.state === address2.state &&
    address1.zip === address2.zip
  );
};

export const parseAddress = (address: Partial<Address>): Address | null => {
  const parsedAddress = AddressSchema.safeParse(address);

  if (!parsedAddress.success) {
    return null;
  }

  return parsedAddress.data;
};

export const parseLegalAddress = (
  data: Map<string, string | null>
): LegalAddress => {
  // Load state data
  const stateCode = data.get(APIFieldKey.legalBusinessState) || '';
  const state = stateLabels[stateCode] || '';

  // Address data
  const addressOne = data.get(APIFieldKey.legalBusinessAddressOne) || '';
  const addressTwo = data.get(APIFieldKey.legalBusinessAddressTwo) || '';
  const city = data.get(APIFieldKey.legalBusinessCity) || '';
  const zip = data.get(APIFieldKey.legalBusinessZipCode) || '';

  const address: Address = {
    addressOne,
    addressTwo,
    city,
    zip,
    state,
  };

  // Validate with ZOD
  const legalAddress: LegalAddress = {
    address,
  };

  return legalAddress;
};

export const parseLegalAddressWithValidation = (
  data: Map<string, string | null>
): LegalAddress | null => {
  const legalAddress = parseLegalAddress(data);
  const parsedAddress = LegalAddressSchema.safeParse(legalAddress);
  return parsedAddress.success ? parsedAddress.data : null;
};

export const parseDbaAddress = (
  data: Map<string, string | null>,
  legalAddress: LegalAddress | null
): DbaAddress => {
  // Check if legal address is not provided
  if (!legalAddress) return { isRequired: false };

  // Get DBA address from data
  const dbaStateCode = data.get(APIFieldKey.dbaAddressState) || '';
  const dbaState = stateLabels[dbaStateCode] || '';

  // Get fields
  const addressOne = data.get(APIFieldKey.dbaAddressOne) || '';
  const addressTwo = data.get(APIFieldKey.dbaAddressTwo) || '';
  const city = data.get(APIFieldKey.dbaAddressCity) || '';
  const zip = data.get(APIFieldKey.dbaAddressZipCode) || '';

  // DBA Address
  const address: Address = {
    addressOne,
    addressTwo,
    city,
    zip,
    state: dbaState,
  };

  // Check if DBA address is equal to legal address
  const isSameAsLegal = areAddressEqual(legalAddress.address, address);

  const dbaAddress: DbaAddress = isSameAsLegal
    ? { isRequired: false }
    : { isRequired: true, address };

  return dbaAddress;
};

export const parseDbaAddressWithValidation = (
  data: Map<string, string | null>,
  legalAddress: LegalAddress | null
): DbaAddress => {
  const dbaAddress = parseDbaAddress(data, legalAddress);
  const parsedAddress = DbaAddressSchema.safeParse(dbaAddress);
  return parsedAddress.success ? parsedAddress.data : { isRequired: false };
};
