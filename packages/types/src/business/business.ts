import type { Dayjs } from 'dayjs';
import { z } from 'zod';

import {
  MAX_BUSINESS_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MIN_BUSINESS_NAME_LENGTH,
  MIN_PHONE_LENGTH_WITH_CHARS,
} from '@/types/constraints';
import { OwnerIndex } from '@/types/iris';

import { DbaAddressSchema, LegalAddressSchema } from './address';
import { BankAccountSchema } from './bank';
import { zodDay } from './day-js';
import { BusinessOwnerSchema } from './owner';
import { BusinessPhoneSchema } from './phone';
import { BusinessProductSchema } from './product';
import { CurrentSalesDataSchema } from './sales';
import { TINSchema } from './tin';

export const BusinessBasicInformationSchema = z.object({
  businessType: z
    .string({ message: 'validation:business_type_required' })
    .trim(),
  legalBusinessName: z
    .string({ message: 'validation:legal_business_name_required' })
    .min(MIN_BUSINESS_NAME_LENGTH, {
      message: 'validation:legal_business_name_min-length',
    })
    .max(MAX_BUSINESS_NAME_LENGTH, {
      message: 'validation:legal_business_name_max_length',
    })
    .trim(),
  legalAddress: LegalAddressSchema,
  legalPhone: z
    .string({ message: 'validation:legal_phone_required' })
    .min(MIN_PHONE_LENGTH_WITH_CHARS, {
      message: 'validation:legal_phone_min_length',
    })
    .trim(),

  tinData: TINSchema,

  // Other basic info
  businessPhone: BusinessPhoneSchema,
  businessEstablishedDate: zodDay,

  dbaName: z
    .string({ message: 'validation:dba_name_required' })
    .max(MAX_BUSINESS_NAME_LENGTH, {
      message: 'validation:dba_name_max_length',
    })
    .trim()
    .optional(),
  dbaAddress: DbaAddressSchema,

  contactName: z
    .string({ message: 'validation:contact_name_required' })
    .max(MAX_NAME_LENGTH, {
      message: 'validation:contact_name_max_length',
    })
    .trim()
    .refine(
      (value) => {
        const [firstName, lastName] = value?.split(' ') ?? [];
        return (
          !!firstName &&
          !!lastName &&
          firstName.length > 0 &&
          lastName.length > 0
        );
      },
      {
        message: 'validation:invalid_contact_name',
      }
    ),

  contactEmail: z
    .string({ message: 'validation:contact_email_required' })
    .email({ message: 'validation:email' })
    .max(MAX_EMAIL_LENGTH, {
      message: 'validation:email_max_length',
    }),
});

export const BusinessSchema = BusinessBasicInformationSchema.extend({
  // Owners
  mainOwner: BusinessOwnerSchema,
  owners: z.record(z.nativeEnum(OwnerIndex), z.nullable(BusinessOwnerSchema)),

  // Products
  mainProduct: BusinessProductSchema,

  // Sales
  currentSales: CurrentSalesDataSchema,

  // Bank account
  bankAccount: BankAccountSchema,

  // Hardware
  selectedDevices: z.record(z.string(), z.string()),
});

export type BusinessBasicInformation = z.infer<
  typeof BusinessBasicInformationSchema
>;

export type BusinessBasicInfoLoading = Omit<
  BusinessBasicInformation,
  'businessEstablishedDate'
> & {
  businessEstablishedDate?: Dayjs;
};

export type Business = z.infer<typeof BusinessSchema>;
