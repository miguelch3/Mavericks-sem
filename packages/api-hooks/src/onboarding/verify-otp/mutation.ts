import {
  APIErrorCode,
  APIHandledError,
  AttributionUrlOutputSchema,
  OnboardingStatus,
  VerifyOTPFieldsSchema,
} from '@mavericks/types';
import z from 'zod';

import { axios } from '@/api-hooks/utils/axios';
import { APIEndpoints } from '@/api-hooks/utils/endpoints';

const VerifyOTPInputSchema = VerifyOTPFieldsSchema.extend({
  phone: z.string().min(10).max(10),
  agent: z.string().optional(),
  publishable_key: z.string().min(1),
  attributionData: AttributionUrlOutputSchema.nullable(),
});

export type VerifyOTPInputSchemaType = z.infer<typeof VerifyOTPInputSchema>;

const VerifyOTPOutputSchema = z.object({
  id: z.string(),
  token: z.string(),
  lead_id: z.number(),
  lead_onboarding_status: z.nativeEnum(OnboardingStatus),
});

type VerifyOTPOutputSchemaType = z.infer<typeof VerifyOTPOutputSchema>;

export const verifyOTP = async (
  input: VerifyOTPInputSchemaType
): Promise<VerifyOTPOutputSchemaType> => {
  const {
    code,
    phone,
    agent,
    publishable_key: pbKey,
    attributionData,
  } = VerifyOTPInputSchema.parse(input);

  const res = await axios.post<VerifyOTPOutputSchemaType>({
    url: APIEndpoints.VERIFY_PHONE_NUMBER_OTP,
    payload: {
      phone,
      code,
      agent,
      publishable_key: pbKey,
      attribution_data: attributionData,
    },
  });

  if (res.token && res.id) {
    return { ...res, token: res.token, id: res.id };
  }

  throw new APIHandledError(
    'No token was returned',
    APIErrorCode.NO_TOKEN_RETURNED
  );
};
