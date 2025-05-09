import { isValidTIN } from '@mavericks/shared';
import dayjs from 'dayjs';
import { z } from 'zod';

import {
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PHONE_LENGTH_WITH_CHARS,
} from '@/types/constraints';

import { AddressSchema } from './address';
import { zodDay } from './day-js';

export const OwnerNameSchema = z
  .object({
    firstName: z
      .string({ message: 'validation:first_name_required' })
      .min(MIN_NAME_LENGTH, { message: 'validation:name_min_length' })
      .max(MAX_NAME_LENGTH, { message: 'validation:name_max_length' })
      .trim(),
    lastName: z
      .string({ message: 'validation:last_name_required' })
      .min(MIN_NAME_LENGTH, { message: 'validation:name_min_length' })
      .max(MAX_NAME_LENGTH, { message: 'validation:name_max_length' })
      .trim(),
    middleName: z
      .string()
      .max(MAX_NAME_LENGTH, { message: 'validation:name_max_length' })
      .trim()
      .optional(),
  })
  .refine((data) => data.firstName || data.lastName, {
    message: 'validation:name_required',
    path: ['firstName', 'lastName'],
  });

export const BusinessOwnerSchema = z.object({
  name: OwnerNameSchema,
  jobTitle: z.string({ message: 'validation:job_title_required' }),
  // authority: z
  //   .array(z.string())
  //   .min(1, { message: 'validation:authority_required' }),
  ownershipPercentage: z
    .number({ message: 'validation:ownership_percentage_required' })
    .min(1, { message: 'validation:ownership_percentage_range_min' })
    .max(100, { message: 'validation:ownership_percentage_range_max' }),
  email: z
    .string({ message: 'validation:email_required' })
    .email({ message: 'validation:email' })
    .max(MAX_EMAIL_LENGTH, { message: 'validation:email_max_length' }),
  dateOfBirth: zodDay.refine(
    (val) => val.isBefore(dayjs().subtract(18, 'year')),
    {
      message: 'validation:age_must_be_at_least_18',
    }
  ),
  homeAddress: AddressSchema,
  ssn: z
    .string({ message: 'validation:tin_required' })
    .trim()
    .refine((value) => isValidTIN(value), {
      message: 'validation:tin_invalid',
      path: ['ssn'],
    }),
  contactPhone: z
    .string({ message: 'validation:contact_phone_required' })
    .trim()
    .min(MIN_PHONE_LENGTH_WITH_CHARS, {
      message: 'validation:contact_phone_min_length',
    }),
});

export type BusinessOwnerName = z.infer<typeof OwnerNameSchema>;
export type BusinessOwner = z.infer<typeof BusinessOwnerSchema>;
