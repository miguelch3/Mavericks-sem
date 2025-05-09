import { useMutation } from '@tanstack/react-query';

import type { BusinessTypeInput } from './mutation';
import { setBusinessType } from './mutation';

export const useSetBusinessTypeMutation = () => {
  const mutation = useMutation({
    mutationKey: ['set-business-type'],
    mutationFn: (input: BusinessTypeInput) => setBusinessType(input),
  });

  return mutation;
};
