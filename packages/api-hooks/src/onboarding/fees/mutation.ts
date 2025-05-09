import { z } from 'zod';

import { axios } from '@/api-hooks/utils/axios';
import { APIFieldKey } from '@/api-hooks/utils/form-fields';

const FeesInputSchema = z.object({
  cardPercentage: z.string(),
  cardFeeAmount: z.string(),
  nonCardPercentage: z.string(),
  nonCardFeeAmount: z.string(),
  appFee: z.string(),
});

export type FeesInput = z.infer<typeof FeesInputSchema>;

export const setFees = async (input: FeesInput): Promise<void> => {
  await axios.patchIrisData({
    payload: {
      fields: [
        {
          id: APIFieldKey.cardPercentageTypeOne,
          value: input.cardPercentage,
        },
        {
          id: APIFieldKey.cardFeeAmountTypeOne,
          value: input.cardFeeAmount,
        },
        {
          id: APIFieldKey.cardPercentageTypeTwo,
          value: input.cardPercentage,
        },
        {
          id: APIFieldKey.cardFeeAmountTypeTwo,
          value: input.cardFeeAmount,
        },
        {
          id: APIFieldKey.nonCardPercentageTypeOne,
          value: input.nonCardPercentage,
        },
        {
          id: APIFieldKey.nonCardFeeAmountTypeOne,
          value: input.nonCardFeeAmount,
        },
        {
          id: APIFieldKey.nonCardPercentageTypeTwo,
          value: input.nonCardPercentage,
        },
        {
          id: APIFieldKey.nonCardFeeAmountTypeTwo,
          value: input.nonCardFeeAmount,
        },
        {
          id: APIFieldKey.appFee,
          value: input.appFee,
        },
        {
          id: APIFieldKey.productType,
          value: '1',
        },
        {
          id: APIFieldKey.fluidpayPartner,
          value: '2',
        },
      ],
    },
  });
};
