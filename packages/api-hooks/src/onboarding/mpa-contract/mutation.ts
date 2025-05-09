import { useSessionStore } from '@mavericks/store';
import { z } from 'zod';

import { axios } from '@/api-hooks/utils/axios';
import { APIEndpoints } from '@/api-hooks/utils/endpoints';
import { APIErrorCode, APIHandledError } from '@/types/error';

const ContractGenerationOutput = z.object({
  lead_signature_id: z.string(),
  contract_url: z.string(),
  status: z.string(),
});

type ContractGenerationOutputType = z.infer<typeof ContractGenerationOutput>;

export const generateMpaContract =
  async (): Promise<ContractGenerationOutputType> => {
    const { leadId } = useSessionStore.getState();

    if (!leadId) {
      throw new APIHandledError(
        'ID to generate contract is missing',
        APIErrorCode.BAD_REQUEST
      );
    }

    const data = await axios.get<ContractGenerationOutputType>({
      url: APIEndpoints.GET_CONTRACT,
      urlParams: { application_id: leadId },
    });

    return data;
  };
