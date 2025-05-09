import type z from 'zod';

import { axios } from '@/api-hooks/utils/axios';
import { APIFieldKey } from '@/api-hooks/utils/form-fields';
import { BusinessBasicInformationSchema } from '@/types/business';

const BusinessTypeInputSchema = BusinessBasicInformationSchema.pick({
  businessType: true,
});

export type BusinessTypeInput = z.infer<typeof BusinessTypeInputSchema>;

export const setBusinessType = async (
  input: BusinessTypeInput
): Promise<void> => {
  const { businessType } = BusinessTypeInputSchema.parse(input);

  await axios.patchIrisData({
    payload: {
      fields: [
        {
          id: APIFieldKey.businessType,
          value: businessType,
        },
      ],
    },
  });
};
