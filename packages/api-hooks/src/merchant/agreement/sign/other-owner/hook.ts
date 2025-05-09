import { useMutation } from '@tanstack/react-query';

import type { SignOwnerInput } from '@/api-hooks/merchant/agreement/sign/sign';

import { signOtherOwnerMutation } from './mutation';

export const useOtherOwnerSignMutation = () => {
  return useMutation({
    mutationKey: ['signOtherOwner'],
    mutationFn: (input: SignOwnerInput) => signOtherOwnerMutation(input),
  });
};
