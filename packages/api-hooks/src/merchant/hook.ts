import { useQuery } from '@tanstack/react-query';

import { getMerchant } from './query';

type UseGetMerchantProps = {
  refetchOnWindowFocus?: boolean;
  enabled?: boolean;
  retry?: boolean;
};

export const useGetMerchant = (params?: UseGetMerchantProps) => {
  const { refetchOnWindowFocus, enabled, retry } = params || {};

  return useQuery({
    queryKey: ['merchant'],
    queryFn: getMerchant,
    refetchOnWindowFocus,
    enabled,
    retry,
  });
};
