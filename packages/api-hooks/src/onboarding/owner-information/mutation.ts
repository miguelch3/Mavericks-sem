import { formatToIrisPhoneNumber } from '@mavericks/shared';
import {
  APIErrorCode,
  APIHandledError,
  BusinessOwnerSchema,
  OwnerAuthority,
  OwnerIndex,
} from '@mavericks/types';
import z from 'zod';

import { getIrisAddressStateValue } from '@/api-hooks/utils/address';
import { axios } from '@/api-hooks/utils/axios';
import { APIOwnerFieldKey } from '@/api-hooks/utils/owner-fields';

const OwnerInformationInputSchema = BusinessOwnerSchema.extend({
  ownerIndex: z.nativeEnum(OwnerIndex),
});

export type OwnerInformationInput = z.infer<typeof OwnerInformationInputSchema>;

export const setOwnerInformation = async (
  input: OwnerInformationInput
): Promise<void> => {
  const {
    name,
    jobTitle,
    ownershipPercentage,
    email,
    dateOfBirth,
    ssn,
    homeAddress,
    contactPhone,
    ownerIndex,
  } = OwnerInformationInputSchema.parse(input);

  // Get address state value
  const selectedState = await getIrisAddressStateValue(homeAddress.state);

  if (!selectedState) {
    throw new APIHandledError(
      'Invalid home address state',
      APIErrorCode.BAD_REQUEST
    );
  }

  // Format data & Payload
  const formattedDOB = dateOfBirth.format('MM/DD/YYYY');
  const formattedSSN = ssn.replaceAll('-', '');
  const formattedContactPhone = formatToIrisPhoneNumber(
    contactPhone.replaceAll('-', '')
  );

  const homeAddressLine =
    `${homeAddress.addressOne} ${homeAddress.addressTwo ?? ''}`.trim();

  const payload = {
    fields: [
      {
        id: APIOwnerFieldKey[ownerIndex].firstName,
        value: name.firstName,
      },
      {
        id: APIOwnerFieldKey[ownerIndex].lastName,
        value: name.lastName,
      },
      {
        id: APIOwnerFieldKey[ownerIndex].middleName,
        value: name.middleName,
      },
      {
        id: APIOwnerFieldKey[ownerIndex].jobTitle,
        value: jobTitle,
      },
      {
        id: APIOwnerFieldKey[ownerIndex].ownershipPercentage,
        value: `${ownershipPercentage}`,
      },
      {
        id: APIOwnerFieldKey[ownerIndex].email,
        value: email,
      },
      {
        id: APIOwnerFieldKey[ownerIndex].dateOfBirth,
        value: formattedDOB,
      },
      {
        id: APIOwnerFieldKey[ownerIndex].ssn,
        value: formattedSSN,
      },
      {
        id: APIOwnerFieldKey[ownerIndex].address,
        value: homeAddressLine,
      },
      {
        id: APIOwnerFieldKey[ownerIndex].city,
        value: homeAddress.city,
      },
      {
        id: APIOwnerFieldKey[ownerIndex].state,
        value: selectedState,
      },
      {
        id: APIOwnerFieldKey[ownerIndex].zipCode,
        value: homeAddress.zip,
      },
      {
        id: APIOwnerFieldKey[ownerIndex].contactPhone,
        value: formattedContactPhone,
      },

      // Authority fields
      {
        id: APIOwnerFieldKey[ownerIndex].authority[
          OwnerAuthority.AUTHORIZED_CONTACT
        ],
        value: '0',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].authority[
          OwnerAuthority.AUTHORIZED_SIGNER
        ],
        value: '1', // Set for all owners
      },
      {
        id: APIOwnerFieldKey[ownerIndex].authority[
          OwnerAuthority.MANAGER_CONTROLLER
        ],
        value: ownerIndex === OwnerIndex.One ? '1' : '0',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].authority[
          OwnerAuthority.PERSONAL_GUARANTEE
        ],
        value: '0',
      },
    ],
  };

  await axios.patchIrisData({
    payload,
  });
};
