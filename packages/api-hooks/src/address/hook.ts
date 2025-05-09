import { useQuery } from '@tanstack/react-query';

import { getAddressStates } from './query';

export const useGetAddressStatesQuery = () => {
  return useQuery({
    queryKey: ['address-states'],
    queryFn: getAddressStates,
  });
};
