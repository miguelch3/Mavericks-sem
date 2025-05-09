import { useSessionStore } from '@mavericks/store';
import { OnboardingStatus } from '@mavericks/types';
import { z } from 'zod';

import { axios } from '@/api-hooks/utils/axios';
import { APIEndpoints } from '@/api-hooks/utils/endpoints';

const DetailsRowRowSchema = z.object({
  id: z.number(),
  field: z.string(),
  value: z.string().nullable(),
});

const DetailsRowSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  fields: DetailsRowRowSchema.array(),
});

const GetLeadOutputSchema = z.object({
  lead_id: z.number(),
  status: z.nativeEnum(OnboardingStatus),
  data: z.object({
    details: DetailsRowSchema.array(),
  }),
});

type GetLeadOutput = z.infer<typeof GetLeadOutputSchema>;

export const getLead = async (): Promise<GetLeadOutput> => {
  const { leadId } = useSessionStore.getState();

  const data = await axios.get<GetLeadOutput>({
    url: APIEndpoints.GET_LEAD_INFORMATION,
    urlParams: { leadId },
  });

  return data;
};
