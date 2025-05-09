import { useMutation } from '@tanstack/react-query';

import { generateMpaContract } from './mutation';

export const useGenerateMpaContractMutation = () => {
  return useMutation({
    mutationKey: ['generate-mpa-contract'],
    mutationFn: generateMpaContract,
  });
};
