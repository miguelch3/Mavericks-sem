import type { z } from 'zod';

import { BankAccountSchema } from '@/types/business/bank';

export const BankInformationSchema = BankAccountSchema;

export type BankInformationFields = z.infer<typeof BankInformationSchema>;
