import { useQuery } from '@tanstack/react-query';

import { getBusinessTypeList } from './query';

type UseBusinessTypeListProps = {
  refetchOnWindowFocus?: boolean;
  enabled?: boolean;
  retry?: boolean;
};

export const useBusinessTypeList = (params?: UseBusinessTypeListProps) => {
  const { refetchOnWindowFocus, enabled, retry } = params || {};

  return useQuery({
    queryKey: ['business-type-list'],
    queryFn: getBusinessTypeList,
    refetchOnWindowFocus,
    enabled,
    retry,
  });
};
