import type { z } from 'zod';

import { BusinessSchema } from '@/types/business/business';

export const WhatDoYouSellSchema = BusinessSchema.pick({
  mainProduct: true,
});

export type WhatDoYouSellFields = z.infer<typeof WhatDoYouSellSchema>;
