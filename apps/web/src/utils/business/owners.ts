import type {
  Address,
  BusinessOwner,
  BusinessOwnerName,
} from '@mavericks/types';
import {
  BusinessOwnerSchema,
  OwnerIndex,
  OwnerNameSchema,
  stateLabels,
} from '@mavericks/types';
import dayjs from 'dayjs';

import { APIOwnerFieldKey } from '@/common-types/form';

import { parseAddress } from './address';

const parseOwnerAddress = (
  data: Map<string, string | null>,
  index: OwnerIndex
): Address | null => {
  const stateCode = data.get(APIOwnerFieldKey[index].state) ?? '';
  const state = stateLabels[stateCode] ?? '';

  const homeAddress: Address = {
    addressOne: data.get(APIOwnerFieldKey[index].address) ?? '',
    addressTwo: '',
    city: data.get(APIOwnerFieldKey[index].city) ?? '',
    zip: data.get(APIOwnerFieldKey[index].zipCode) ?? '',
    state,
  };

  const parsedAddress = parseAddress(homeAddress);

  return parsedAddress;
};

const parseOwnerName = (
  data: Map<string, string | null>,
  index: OwnerIndex
): BusinessOwnerName | null => {
  const firstName = data.get(APIOwnerFieldKey[index].firstName) ?? '';
  const lastName = data.get(APIOwnerFieldKey[index].lastName) ?? '';
  const middleName = data.get(APIOwnerFieldKey[index].middleName) ?? '';

  const parsedName = OwnerNameSchema.safeParse({
    firstName,
    lastName,
    middleName,
  });

  return parsedName.success ? parsedName.data : null;
};

// TODO: Check if we need to parse the authority
// const parseOwnerAuthority = (
//   data: Map<string, string | null>,
//   index: OwnerIndex
// ): string[] => {
//   const authority: string[] = [];

//   const authorizedSigner = data.get(
//     APIOwnerFieldKey[index].authority[OwnerAuthority.AUTHORIZED_SIGNER]
//   );
//   const managerController = data.get(
//     APIOwnerFieldKey[index].authority[OwnerAuthority.MANAGER_CONTROLLER]
//   );
//   const personalGuarantee = data.get(
//     APIOwnerFieldKey[index].authority[OwnerAuthority.PERSONAL_GUARANTEE]
//   );
//   const authorizedContact = data.get(
//     APIOwnerFieldKey[index].authority[OwnerAuthority.AUTHORIZED_CONTACT]
//   );

//   if (authorizedSigner === OwnerAuthorityValue.YES) {
//     authority.push(OwnerAuthority.AUTHORIZED_SIGNER);
//   }

//   if (managerController === OwnerAuthorityValue.YES) {
//     authority.push(OwnerAuthority.MANAGER_CONTROLLER);
//   }

//   if (personalGuarantee === OwnerAuthorityValue.YES) {
//     authority.push(OwnerAuthority.PERSONAL_GUARANTEE);
//   }

//   if (authorizedContact === OwnerAuthorityValue.YES) {
//     authority.push(OwnerAuthority.AUTHORIZED_CONTACT);
//   }

//   return authority;
// };

export const parseOwnerData = (
  data: Map<string, string | null>
): Record<OwnerIndex, BusinessOwner | null> => {
  const owners: Record<OwnerIndex, BusinessOwner | null> = {
    ownerOne: null,
    ownerTwo: null,
    ownerThree: null,
    ownerFour: null,
  };

  Object.values(OwnerIndex).forEach((index) => {
    // Owner data
    const ownerData: Partial<BusinessOwner> = {
      jobTitle: data.get(APIOwnerFieldKey[index].jobTitle) ?? '',
      ssn: data.get(APIOwnerFieldKey[index].ssn) ?? '',
      email: data.get(APIOwnerFieldKey[index].email) ?? '',
      contactPhone: data.get(APIOwnerFieldKey[index].contactPhone) ?? '',
    };

    // Name
    const name = parseOwnerName(data, index);
    ownerData.name = name ?? undefined;

    // Ownership Percentage
    const rawPercentage = data
      .get(APIOwnerFieldKey[index].ownershipPercentage)
      ?.replace('%', '');
    ownerData.ownershipPercentage = Number(rawPercentage) || 0;

    // Address
    const homeAddress = parseOwnerAddress(data, index);
    ownerData.homeAddress = homeAddress ?? undefined;

    // Authority // TODO: Check if we need to parse the authority
    // const authority = parseOwnerAuthority(data, index);
    // if (authority.length < 1) return;

    // Date of Birth
    const dateOfBirthString =
      data.get(APIOwnerFieldKey[index].dateOfBirth) || null;
    if (!dateOfBirthString) return;
    ownerData.dateOfBirth = dayjs(dateOfBirthString);

    const parsedOwner = BusinessOwnerSchema.safeParse(ownerData);

    if (parsedOwner.success) {
      owners[index] = parsedOwner.data;
    }
  });

  return owners;
};
