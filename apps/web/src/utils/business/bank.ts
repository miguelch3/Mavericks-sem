import type { BankAccount, BankAccountNumber } from '@mavericks/types';
import { BankAccountNumberSchema, BankAccountSchema } from '@mavericks/types';

import { APIFieldKey } from '@/common-types/form';

const parseBankAccountNumber = (
  data: Map<string, string | null>
): BankAccountNumber => {
  const bankAccountNumber: BankAccountNumber = {
    number: data.get(APIFieldKey.accountNumber) ?? '',
    confirm: data.get(APIFieldKey.accountNumberConfirm) ?? '',
  };

  return bankAccountNumber;
};

export const parseBankAccountNumberWithValidation = (
  data: Map<string, string | null>
): BankAccountNumber => {
  const bankAccountNumber = parseBankAccountNumber(data);
  const parsedBankAccountNumber =
    BankAccountNumberSchema.safeParse(bankAccountNumber);

  return parsedBankAccountNumber.success
    ? parsedBankAccountNumber.data
    : { number: '', confirm: '' };
};

export const parseBankAccount = (
  data: Map<string, string | null>
): BankAccount => {
  const bankAccountNumber = parseBankAccountNumber(data);

  // Bank account
  const bankAccount: BankAccount = {
    bankName: data.get(APIFieldKey.bankName) ?? '',
    routingNumber: data.get(APIFieldKey.routingNumber) ?? '',
    accountHolderName: data.get(APIFieldKey.accountHolderName) ?? '',
    accountNumber: bankAccountNumber,
    voidedCheck: null,
  };

  return bankAccount;
};

export const parseBankAccountWithValidation = (
  data: Map<string, string | null>
): BankAccount | null => {
  const bankAccount = parseBankAccount(data);
  const parsedBankAccount = BankAccountSchema.safeParse(bankAccount);
  return parsedBankAccount.success ? parsedBankAccount.data : null;
};
