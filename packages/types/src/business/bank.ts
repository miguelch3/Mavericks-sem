import { z } from 'zod';

export const BankAccountNumberSchema = z
  .object({
    number: z
      .string({ message: 'validation:account_number_required' })
      .min(1, { message: 'validation:account_number_required' })
      .trim(),
    confirm: z
      .string({ message: 'validation:account_number_confirm_required' })
      .min(1, { message: 'validation:account_number_confirm_required' })
      .trim(),
  })
  .refine(
    ({ number, confirm }) => {
      return number === confirm;
    },
    {
      message: 'validation:account_number_confirm_not_match',
      path: ['confirm'],
    }
  );

export const BankAccountSchema = z.object({
  bankName: z
    .string({ message: 'validation:bank_name_required' })
    .min(1, { message: 'validation:bank_name_required' })
    .trim(),
  routingNumber: z
    .string({ message: 'validation:routing_number_required' })
    .min(1, { message: 'validation:routing_number_required' })
    .trim()
    .regex(/^[0-9]{9}$/, { message: 'validation:routing_number_9_digits' }),
  accountHolderName: z
    .string({ message: 'validation:account_holder_name_required' })
    .min(1, { message: 'validation:account_holder_name_required' })
    .trim(),
  accountNumber: BankAccountNumberSchema,
  voidedCheck: z.unknown().optional(),
});

export type BankAccountNumber = z.infer<typeof BankAccountNumberSchema>;
export type BankAccount = z.infer<typeof BankAccountSchema>;
