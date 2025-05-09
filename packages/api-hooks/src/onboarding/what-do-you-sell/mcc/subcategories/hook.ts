import { useQuery } from '@tanstack/react-query';

import type { GetMCCSubcategoriesInput } from './query';
import { getMCCSubcategories } from './query';

export const useMCCSubcategories = (input: GetMCCSubcategoriesInput) => {
  return useQuery({
    queryKey: ['mcc-subcategories', input],
    queryFn: () => getMCCSubcategories(input),
  });
};
