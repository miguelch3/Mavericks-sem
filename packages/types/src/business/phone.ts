import { z } from 'zod';

export const BusinessPhoneSchema = z
  .object({
    isRequired: z.boolean().default(false),
    phone: z
      .string({ message: 'validation:business_phone_required' })
      .min(10, { message: 'validation:business_phone_min_length' })
      .optional(),
  })
  .refine((data) => !data.isRequired || data.phone, {
    message: 'validation:business_phone_required',
    path: ['phone'],
  });

export type BusinessPhone = z.infer<typeof BusinessPhoneSchema>;
