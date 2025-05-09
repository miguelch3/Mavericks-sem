import { useQuery } from '@tanstack/react-query';

import { getLead } from './query';

type UseGetLeadQueryProps = {
  refetchOnWindowFocus?: boolean;
  enabled?: boolean;
  retry?: boolean;
};

export const useGetLeadQuery = (params?: UseGetLeadQueryProps) => {
  const { refetchOnWindowFocus, enabled, retry } = params || {};

  return useQuery({
    queryKey: ['lead'],
    queryFn: getLead,
    refetchOnWindowFocus,
    enabled,
    retry,
  });
};
