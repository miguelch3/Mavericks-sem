import { useQuery } from '@tanstack/react-query';

import { getMCCCategories } from './query';

export const useMCCCategories = () => {
  return useQuery({
    queryKey: ['mcc-categories'],
    queryFn: getMCCCategories,
  });
};
