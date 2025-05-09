import { z } from 'zod';

export const VerifyOTPFieldsSchema = z.object({
  code: z
    .string({ message: 'validation:invalid_otp_code_length' })
    .min(4, { message: 'validation:invalid_otp_code_length' }),
});

export type VerifyOTPFieldsType = z.infer<typeof VerifyOTPFieldsSchema>;
