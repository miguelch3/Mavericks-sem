import { useMutation } from '@tanstack/react-query';

import type { SignMainOwnerInput } from './mutation';
import { signMainOwnerMutation } from './mutation';

export const useMainOwnerSignMutation = () => {
  return useMutation({
    mutationKey: ['signMainOwner'],
    mutationFn: (input: SignMainOwnerInput) => signMainOwnerMutation(input),
  });
};
