import { z } from 'zod';

export const AttributionUrlOutputSchema = z.object({
  user_id: z.string(),
  channel_id: z.string(),
  rsl_user_id: z.string().optional(),
  referral_partner_user_id: z.string().optional(),
  source_id: z.string().optional(),
});

export type AttributionUrlOutput = z.infer<typeof AttributionUrlOutputSchema>;

export type AttributionUrlPayload = {
  group: number;
  users: string[];
};
