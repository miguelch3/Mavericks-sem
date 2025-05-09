import type { BankAccount } from '@mavericks/types';
import { useMutation } from '@tanstack/react-query';

import { setBankAccount } from './mutation';

export const useSetBankAccountMutation = () => {
  return useMutation({
    mutationKey: ['set-bank-account'],
    mutationFn: (input: BankAccount) => setBankAccount(input),
  });
};
