import { useMutation } from '@tanstack/react-query';

import type { BusinessBasicInformationInput } from './mutation';
import { setBusinessBasicInfo } from './mutation';

export const useSetBusinessBasicInfoMutation = () => {
  const mutation = useMutation({
    mutationKey: ['set-business-basic-info'],
    mutationFn: (input: BusinessBasicInformationInput) =>
      setBusinessBasicInfo(input),
  });

  return mutation;
};
