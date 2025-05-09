import { z } from 'zod';

import type { TINOption } from '@/types/business/tin';

const APIDropdownOptionSchema = z
  .object({
    value: z.string(),
    key: z.string(),
  })
  .array();

export const APIOptionsSchema = z.object({
  dropdown: APIDropdownOptionSchema,
});

export type APIOptions = z.infer<typeof APIOptionsSchema>;

export const DropdownOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type DropdownOption = z.infer<typeof DropdownOptionSchema>;

export const IrisTINValue: Record<TINOption, string> = {
  EIN: '2',
  SSN: '3',
  ITIN: '4',
};
