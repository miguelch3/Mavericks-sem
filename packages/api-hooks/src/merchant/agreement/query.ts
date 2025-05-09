import { z } from 'zod';

import { axios } from '@/api-hooks/utils/axios';
import { APIEndpoints } from '@/api-hooks/utils/endpoints';

const GetContractInputSchema = z.object({
  leadSignatureId: z.string(),
});

export type GetContractInput = z.infer<typeof GetContractInputSchema>;

const GetContractOutputSchema = z.object({
  lead_signature_id: z.string().nullable(),
  contract_url: z.string().nullable(),
  status: z.string(),
});

type GetContractOutput = z.infer<typeof GetContractOutputSchema>;

export const getApplication = async (
  input: GetContractInput
): Promise<GetContractOutput> => {
  const { leadSignatureId } = GetContractInputSchema.parse(input);

  const data = await axios.get<GetContractOutput>({
    url: APIEndpoints.GET_OTHERS_CONTRACT,
    urlParams: { lead_signature_id: leadSignatureId },
  });

  return data;
};
