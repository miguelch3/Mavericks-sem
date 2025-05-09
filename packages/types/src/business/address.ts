import { z } from 'zod';

import { MAX_CITY_LENGTH, MAX_ZIP_CODE_LENGTH } from '@/types/constraints';

export const AddressSchema = z.object({
  addressOne: z
    .string({ message: 'validation:address_one_required' })
    .min(1, { message: 'validation:address_one_required' })
    .trim(),
  addressTwo: z.string().trim().optional(),
  city: z
    .string({ message: 'validation:city_required' })
    .min(1, { message: 'validation:city_required' })
    .max(MAX_CITY_LENGTH, { message: 'validation:city_max_length' })
    .trim(),
  state: z
    .string({ message: 'validation:state_required' })
    .min(1, { message: 'validation:state_required' })
    .trim(),
  zip: z
    .string({ message: 'validation:zip_required' })
    .min(1, { message: 'validation:zip_required' })
    .max(MAX_ZIP_CODE_LENGTH, { message: 'validation:zip_max_length' })
    .trim(),
});

export const LegalAddressSchema = z.object({
  address: AddressSchema,
});

export const DbaAddressSchema = z
  .object({
    isRequired: z.boolean().default(false),
    address: AddressSchema.optional(),
  })
  .refine((data) => !data.isRequired || data.address, {
    message: 'validation:dba_address_required',
    path: ['dbaAddress'],
  });

export type Address = z.infer<typeof AddressSchema>;
export type LegalAddress = z.infer<typeof LegalAddressSchema>;
export type DbaAddress = z.infer<typeof DbaAddressSchema>;
