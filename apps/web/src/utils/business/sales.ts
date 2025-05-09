import type {
  CurrentSalesData,
  CurrentSalesPercentages,
} from '@mavericks/types';
import {
  CurrentSalesDataSchema,
  CurrentSalesPercentagesSchema,
} from '@mavericks/types';

import { APIFieldKey } from '@/common-types/form';

const parseCurrentSalesPercentages = (
  data: Map<string, string | null>
): CurrentSalesPercentages => {
  const defaultPercentages: CurrentSalesPercentages = {
    cardSwipePercentage: 0,
    onlinePercentage: 0,
    keyedPercentage: 0,
  };

  const cardSwipePercentage = data.get(APIFieldKey.cardSwipePercentage) || 0;
  const onlinePercentage = data.get(APIFieldKey.onlinePercentage) || 0;
  const keyedPercentage = data.get(APIFieldKey.keyedPercentage) || 0;

  const percentages: CurrentSalesPercentages = {
    cardSwipePercentage: Number(cardSwipePercentage),
    onlinePercentage: Number(onlinePercentage),
    keyedPercentage: Number(keyedPercentage),
  };

  const parsedPercentages =
    CurrentSalesPercentagesSchema.safeParse(percentages);

  return parsedPercentages.success
    ? parsedPercentages.data
    : defaultPercentages;
};

export const parseCurrentSalesPercentagesWithValidation = (
  data: Map<string, string | null>
): CurrentSalesPercentages | null => {
  const percentages = parseCurrentSalesPercentages(data);
  const parsedPercentages =
    CurrentSalesPercentagesSchema.safeParse(percentages);
  return parsedPercentages.success ? parsedPercentages.data : null;
};

export const parseCurrentSales = (
  data: Map<string, string | null>
): CurrentSalesData => {
  const avgMonthlyCC = data.get(APIFieldKey.averageMonthlyInCreditCard) || '';
  const avgTicketValue = data.get(APIFieldKey.averageTicketValue) || '';
  const highestAmountToDate = data.get(APIFieldKey.highestAmountToDate) || '';

  const percentages = parseCurrentSalesPercentages(data);

  const currentSales: CurrentSalesData = {
    averageMonthlyInCreditCard: Number(avgMonthlyCC),
    averageTicketValue: Number(avgTicketValue),
    highestAmountToDate: Number(highestAmountToDate),
    salesPercentage: percentages,
  };

  return currentSales;
};

export const parseCurrentSalesWithValidation = (
  data: Map<string, string | null>
): CurrentSalesData | null => {
  const currentSales = parseCurrentSales(data);
  const parsedCurrentSales = CurrentSalesDataSchema.safeParse(currentSales);
  return parsedCurrentSales.success ? parsedCurrentSales.data : null;
};
