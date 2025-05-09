import type { z } from 'zod';

import { CurrentSalesDataSchema } from '@/types/business/sales';

export const CurrentSalesSchema = CurrentSalesDataSchema;

export type CurrentSalesFields = z.infer<typeof CurrentSalesSchema>;
