import type { CurrentSalesData } from '@mavericks/types';
import { useMutation } from '@tanstack/react-query';

import { setCurrentSales } from './mutation';

export const useSetCurrentSalesMutation = () => {
  return useMutation({
    mutationKey: ['set-current-sales'],
    mutationFn: (input: CurrentSalesData) => setCurrentSales(input),
  });
};
