import { z } from 'zod';

import { APIErrorCode } from './api-error-codes';

export const HayesErrorResponseSchema = z.object({
  error: z.nativeEnum(APIErrorCode),
  message: z.string(),
  statusCode: z.number(),
  request_id: z.string().optional(),
});

export type HayesErrorResponse = z.infer<typeof HayesErrorResponseSchema>;
