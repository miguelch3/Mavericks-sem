import { z } from 'zod';

import { OnboardingStatus } from './onboarding';

export const BusinessFieldRowSchema = z.object({
  id: z.number(),
  field: z.string(),
  value: z.string().nullable(),
});

export type BusinessFieldRow = z.infer<typeof BusinessFieldRowSchema>;

export const BusinessFieldGroupRowSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  fields: BusinessFieldRowSchema.array(),
});

export type BusinessFieldGroup = z.infer<typeof BusinessFieldGroupRowSchema>;

export const GetLeadOutputSchema = z.object({
  lead_id: z.number(),
  status: z.nativeEnum(OnboardingStatus),
  data: z.object({
    details: BusinessFieldGroupRowSchema.array(),
  }),
});
