import type { BusinessProduct } from '@mavericks/types';
import { useMutation } from '@tanstack/react-query';

import { setWhatDoYouSell } from './mutation';

export const useSetWhatDoYouSellMutation = () => {
  return useMutation({
    mutationKey: ['set-what-do-you-sell'],
    mutationFn: (input: BusinessProduct) => setWhatDoYouSell(input),
  });
};
