import { useMutation } from '@tanstack/react-query';

import type { OwnerInformationInput } from './mutation';
import { setOwnerInformation } from './mutation';

export const useSetOwnerInformationMutation = () => {
  const mutation = useMutation({
    mutationKey: ['set-owner-information'],
    mutationFn: (input: OwnerInformationInput) => setOwnerInformation(input),
  });

  return mutation;
};
