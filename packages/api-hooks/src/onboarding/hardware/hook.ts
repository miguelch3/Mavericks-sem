import { useMutation } from '@tanstack/react-query';

import type { SetHardwareInput } from './mutation';
import { setHardware } from './mutation';

export const useSetHardwareMutation = () => {
  return useMutation({
    mutationKey: ['set-hardware'],
    mutationFn: (input: SetHardwareInput) => setHardware(input),
  });
};
