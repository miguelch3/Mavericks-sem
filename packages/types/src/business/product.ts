import { charsRestrictedRegex, isValidUrl } from '@mavericks/shared';
import { z } from 'zod';

import {
  MAX_PRODUCT_DESCRIPTION_LENGTH,
  MAX_WEBSITE_LENGTH,
  MIN_PRODUCT_DESCRIPTION_LENGTH,
} from '@/types/constraints';

export const BusinessProductSchema = z.object({
  description: z
    .string({ message: 'validation:description_required' })
    .trim()
    .min(MIN_PRODUCT_DESCRIPTION_LENGTH, {
      message: 'validation:product_description_min_length',
    })
    .max(MAX_PRODUCT_DESCRIPTION_LENGTH, {
      message: 'validation:product_description_max_length',
    })
    .regex(charsRestrictedRegex, {
      message: 'validation:product_description_invalid_characters',
    }),

  category: z.string({ message: 'validation:category_required' }).trim(),
  subcategory: z
    .string({ message: 'validation:subcategory_required' })
    .trim()
    .nullable(),
  website: z
    .string({ message: 'validation:website_required' })
    .max(MAX_WEBSITE_LENGTH, { message: 'validation:website_max_length' })
    .refine((value) => isValidUrl(value), {
      message: 'validation:url_invalid',
    }),
});

export type BusinessProduct = z.infer<typeof BusinessProductSchema>;
