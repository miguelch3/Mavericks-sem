import { useMutation } from '@tanstack/react-query';

import type { OwnerClearInformationInput } from './mutation';
import { clearOwnerInformation } from './mutation';

export const useClearOwnerInformationMutation = () => {
  const mutation = useMutation({
    mutationKey: ['clear-owner-information'],
    mutationFn: (input: OwnerClearInformationInput) =>
      clearOwnerInformation(input),
  });

  return mutation;
};
