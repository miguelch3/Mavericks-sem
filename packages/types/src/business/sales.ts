import { z } from 'zod';

import {
  MAX_HIGHEST_AMOUNT_VALUE,
  MAX_MONTHLY_CREDIT_CARD_SALES,
  MAX_MONTHLY_TICKET_VALUE,
  MIN_HIGHEST_AMOUNT_VALUE,
  MIN_MONTHLY_CREDIT_CARD_SALES,
  MIN_MONTHLY_TICKET_VALUE,
} from '@/types/constraints';

export const CurrentSalesPercentagesSchema = z
  .object({
    cardSwipePercentage: z
      .number()
      .min(0, { message: 'validation:card_swipe_percentage_min' })
      .max(100, { message: 'validation:card_swipe_percentage_max' })
      .default(0),
    onlinePercentage: z
      .number()
      .min(0, { message: 'validation:online_percentage_min' })
      .max(100, { message: 'validation:online_percentage_max' })
      .default(0),
    keyedPercentage: z
      .number()
      .min(0, { message: 'validation:keyed_percentage_min' })
      .max(100, { message: 'validation:keyed_percentage_max' })
      .default(0),
  })
  .refine(
    (data) => {
      const { cardSwipePercentage, onlinePercentage, keyedPercentage } = data;
      const total =
        (cardSwipePercentage || 0) +
        (onlinePercentage || 0) +
        (keyedPercentage || 0);

      return total === 100;
    },
    {
      message: 'validation:percentage_sum_must_be_100',
      path: [''],
    }
  );

export const CurrentSalesDataSchema = z.object({
  averageMonthlyInCreditCard: z
    .number({
      message: 'validation:average_monthly_credit_card_required',
    })
    .min(MIN_MONTHLY_CREDIT_CARD_SALES, {
      message: 'validation:average_monthly_credit_card_min',
    })
    .max(MAX_MONTHLY_CREDIT_CARD_SALES, {
      message: 'validation:average_monthly_credit_card_max',
    }),

  averageTicketValue: z
    .number({
      message: 'validation:average_ticket_value_required',
    })
    .min(MIN_MONTHLY_TICKET_VALUE, {
      message: 'validation:average_ticket_value_min',
    })
    .max(MAX_MONTHLY_TICKET_VALUE, {
      message: 'validation:average_ticket_value_max',
    }),

  highestAmountToDate: z
    .number({
      message: 'validation:highest_amount_to_date_required',
    })
    .min(MIN_HIGHEST_AMOUNT_VALUE, {
      message: 'validation:highest_amount_to_date_min',
    })
    .max(MAX_HIGHEST_AMOUNT_VALUE, {
      message: 'validation:highest_amount_to_date_max',
    }),

  salesPercentage: CurrentSalesPercentagesSchema,
});

export type CurrentSalesPercentages = z.infer<
  typeof CurrentSalesPercentagesSchema
>;
export type CurrentSalesData = z.infer<typeof CurrentSalesDataSchema>;
