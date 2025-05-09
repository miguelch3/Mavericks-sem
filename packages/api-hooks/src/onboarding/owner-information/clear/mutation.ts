import { OwnerAuthority, OwnerIndex } from '@mavericks/types';
import z from 'zod';

import { axios } from '@/api-hooks/utils/axios';
import { APIOwnerFieldKey } from '@/api-hooks/utils/owner-fields';

const OwnerClearInformationInputSchema = z.object({
  ownerIndex: z.nativeEnum(OwnerIndex),
});

export type OwnerClearInformationInput = z.infer<
  typeof OwnerClearInformationInputSchema
>;

export const clearOwnerInformation = async (
  input: OwnerClearInformationInput
): Promise<void> => {
  const { ownerIndex } = OwnerClearInformationInputSchema.parse(input);

  const payload = {
    fields: [
      {
        id: APIOwnerFieldKey[ownerIndex].firstName,
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].lastName,
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].middleName,
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].jobTitle,
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].ownershipPercentage,
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].email,
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].dateOfBirth,
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].ssn,
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].address,
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].city,
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].state,
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].zipCode,
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].contactPhone,
        value: '',
      },

      // Authority fields
      {
        id: APIOwnerFieldKey[ownerIndex].authority[
          OwnerAuthority.AUTHORIZED_CONTACT
        ],
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].authority[
          OwnerAuthority.AUTHORIZED_SIGNER
        ],
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].authority[
          OwnerAuthority.MANAGER_CONTROLLER
        ],
        value: '',
      },
      {
        id: APIOwnerFieldKey[ownerIndex].authority[
          OwnerAuthority.PERSONAL_GUARANTEE
        ],
        value: '',
      },
    ],
  };

  await axios.patchIrisData({
    payload,
  });
};
