import type { CurrentSalesData } from '@mavericks/types';
import { CurrentSalesDataSchema } from '@mavericks/types';

import { axios } from '@/api-hooks/utils/axios';
import { APIFieldKey } from '@/api-hooks/utils/form-fields';

enum NextDayFundingOptions {
  YES = 1,
  NO = 2,
}

enum NextDayFunding2Options {
  YES = 2,
  NO = 3,
}

export const setCurrentSales = async (
  input: CurrentSalesData
): Promise<void> => {
  const {
    averageMonthlyInCreditCard,
    averageTicketValue,
    highestAmountToDate,
    salesPercentage,
  } = CurrentSalesDataSchema.parse(input);

  // Discount Type (Hardcoded value)
  const discountType = 1;

  // Next day funding calculation
  const isEligibleForNextDayFunding =
    averageTicketValue < 1000 &&
    highestAmountToDate < 1000 &&
    salesPercentage.cardSwipePercentage >= 70;

  const nextDayFunding = isEligibleForNextDayFunding
    ? NextDayFundingOptions.YES
    : NextDayFundingOptions.NO;

  const nextDayFunding2 = isEligibleForNextDayFunding
    ? NextDayFunding2Options.YES
    : NextDayFunding2Options.NO;

  // Monthly Values
  const monthlyMcAndVisa = Math.floor(averageMonthlyInCreditCard * 0.94); // 94% of the total
  const monthlyAmex = Math.floor(averageMonthlyInCreditCard * 0.06); // 6% of the total

  // Annual Values
  const annualMCAndVisa = Math.floor(12 * averageMonthlyInCreditCard);
  const annualCashAndCreditVolume = Math.floor(1.3 * annualMCAndVisa);

  const annualWexVolume = 0;

  const annualAmexVolume = Math.floor(12 * monthlyAmex);
  const annualDiscoverValue = Math.floor(0.3 * annualAmexVolume);

  await axios.patchIrisData({
    payload: {
      fields: [
        {
          id: APIFieldKey.averageMonthlyInCreditCard,
          value: String(monthlyMcAndVisa),
        },
        {
          id: APIFieldKey.averageTicketValue,
          value: String(averageTicketValue),
        },
        {
          id: APIFieldKey.highestAmountToDate,
          value: String(highestAmountToDate),
        },
        {
          id: APIFieldKey.cardSwipePercentage,
          value: String(salesPercentage.cardSwipePercentage),
        },
        {
          id: APIFieldKey.onlinePercentage,
          value: String(salesPercentage.onlinePercentage),
        },
        {
          id: APIFieldKey.keyedPercentage,
          value: String(salesPercentage.keyedPercentage),
        },
        {
          id: APIFieldKey.averageAmexMonthlySales,
          value: String(monthlyAmex),
        },
        {
          id: APIFieldKey.averageAmexTicketValue,
          value: String(averageTicketValue),
        },
        {
          id: APIFieldKey.averageAmexMonthlySalesTwo,
          value: String(monthlyAmex),
        },
        {
          id: APIFieldKey.averageAmexTicketValueTwo,
          value: String(averageTicketValue),
        },
        {
          id: APIFieldKey.discountType,
          value: String(discountType),
        },
        {
          id: APIFieldKey.nextDayFunding,
          value: String(nextDayFunding),
        },
        {
          id: APIFieldKey.nextDayFunding2,
          value: String(nextDayFunding2),
        },
        {
          id: APIFieldKey.zeroOutOne,
          value: '',
        },
        {
          id: APIFieldKey.zeroOutTwo,
          value: '',
        },
        {
          id: APIFieldKey.zeroOutThree,
          value: '',
        },
        {
          id: APIFieldKey.zeroOutFour,
          value: '',
        },
        {
          id: APIFieldKey.zeroOutFive,
          value: '',
        },
        {
          id: APIFieldKey.zeroOutSix,
          value: '',
        },
        {
          id: APIFieldKey.zeroOutSeven,
          value: '',
        },
        {
          id: APIFieldKey.rejectionFee,
          value: '35',
        },
        {
          id: APIFieldKey.averageMonthlySalesVol,
          value: String(averageMonthlyInCreditCard),
        },
        {
          id: APIFieldKey.averageTicketSize,
          value: String(averageTicketValue),
        },
        {
          id: APIFieldKey.highestTicketSize,
          value: String(highestAmountToDate),
        },
        {
          id: APIFieldKey.annualCashAndCreditVolume,
          value: String(annualCashAndCreditVolume),
        },
        {
          id: APIFieldKey.annualMCAndVisa,
          value: String(annualMCAndVisa),
        },
        {
          id: APIFieldKey.annualWexVolume,
          value: String(annualWexVolume),
        },
        {
          id: APIFieldKey.annualAmexVolume,
          value: String(annualAmexVolume),
        },
        {
          id: APIFieldKey.annualDiscoverValue,
          value: String(annualDiscoverValue),
        },
      ],
    },
  });
};
