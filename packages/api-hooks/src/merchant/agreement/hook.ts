import { useQuery } from '@tanstack/react-query';

import type { GetContractInput } from './query';
import { getApplication } from './query';

type UseGetApplicationParams = {
  enabled?: boolean;
};

export const useGetApplication = (
  input: GetContractInput,
  params?: UseGetApplicationParams
) => {
  const { enabled } = params ?? {};

  return useQuery({
    queryKey: ['getApplication', input],
    queryFn: () => getApplication(input),
    enabled,
  });
};
