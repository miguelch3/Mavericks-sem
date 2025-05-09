import { z } from 'zod';

import { MIN_PHONE_LENGTH_WITH_CHARS } from '@/types/constraints';

export const PhoneSignInFieldsSchema = z.object({
  phone: z.string().min(MIN_PHONE_LENGTH_WITH_CHARS, {
    message: 'validation:invalid_phone_number_length',
  }),
});

// Define the type of the schema using z.infer
export type PhoneSignInFieldsType = z.infer<typeof PhoneSignInFieldsSchema>;
