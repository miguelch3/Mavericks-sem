import { useMutation } from '@tanstack/react-query';

import type { FeesInput } from './mutation';
import { setFees } from './mutation';

export const useSetFeesMutation = () => {
  return useMutation({
    mutationKey: ['set-fees'],
    mutationFn: (input: FeesInput) => setFees(input),
  });
};
