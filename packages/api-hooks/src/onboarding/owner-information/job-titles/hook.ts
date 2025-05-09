import { useQuery } from '@tanstack/react-query';

import { getJobTitles } from './query';

type UseJobTitlesProps = {
  refetchOnWindowFocus?: boolean;
  enabled?: boolean;
  retry?: boolean;
};

export const useJobTitles = (params?: UseJobTitlesProps) => {
  const { refetchOnWindowFocus, enabled, retry } = params || {};

  return useQuery({
    queryKey: ['job-titles'],
    queryFn: getJobTitles,
    refetchOnWindowFocus,
    enabled,
    retry,
  });
};
