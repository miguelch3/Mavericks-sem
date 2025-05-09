import type { z } from 'zod';

import { BusinessSchema } from '@/types/business/business';

export const BusinessTypeFieldsSchema = BusinessSchema.pick({
  businessType: true,
});

export type BusinessTypeFieldsType = z.infer<typeof BusinessTypeFieldsSchema>;
