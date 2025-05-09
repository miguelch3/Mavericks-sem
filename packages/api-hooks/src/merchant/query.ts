import { useSessionStore } from '@mavericks/store';
import { OnboardingStatus } from '@mavericks/types';
import { z } from 'zod';

import { axios } from '@/api-hooks/utils/axios';
import { APIEndpoints } from '@/api-hooks/utils/endpoints';

const IncomingMerchantSchema = z.object({
  id: z.string(),
  lead_id: z.number().nullable(),
  phone: z.string(),
  lead_onboarding_status: z.nativeEnum(OnboardingStatus).nullable(),
});

type IncomingMerchant = z.infer<typeof IncomingMerchantSchema>;

export const getMerchant = async (): Promise<IncomingMerchant> => {
  const { token } = useSessionStore.getState();

  if (!token) {
    return {
      id: '',
      lead_id: null,
      phone: '',
      lead_onboarding_status: null,
    };
  }

  const data = await axios.get<IncomingMerchant>({
    url: APIEndpoints.GET_MERCHANT_INFO,
  });

  return data;
};
