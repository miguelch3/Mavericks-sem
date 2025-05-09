import type { BankAccount } from '@mavericks/types';
import { BankAccountSchema } from '@mavericks/types';

import { axios } from '@/api-hooks/utils/axios';
import { APIFieldKey } from '@/api-hooks/utils/form-fields';

export const setBankAccount = async (input: BankAccount): Promise<void> => {
  const { bankName, routingNumber, accountNumber, accountHolderName } =
    BankAccountSchema.parse(input);

  await axios.patchIrisData({
    payload: {
      fields: [
        {
          id: APIFieldKey.bankName,
          value: bankName,
        },
        {
          id: APIFieldKey.routingNumber,
          value: routingNumber,
        },
        {
          id: APIFieldKey.accountNumber,
          value: accountNumber.number,
        },
        {
          id: APIFieldKey.accountNumberConfirm,
          value: accountNumber.confirm,
        },
        {
          id: APIFieldKey.accountHolderName,
          value: accountHolderName,
        },
        {
          id: APIFieldKey.newAccountHold,
          value: '1',
        },
        {
          id: APIFieldKey.merchantApplicationType,
          value: '3',
        },
      ],
    },
  });
};
