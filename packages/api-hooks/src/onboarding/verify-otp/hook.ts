import { useMutation } from '@tanstack/react-query';

import type { VerifyOTPInputSchemaType } from './mutation';
import { verifyOTP } from './mutation';

export const useVerifyOTPMutation = () => {
  const mutation = useMutation({
    mutationKey: ['verify-otp'],
    mutationFn: (input: VerifyOTPInputSchemaType) => verifyOTP(input),
  });

  return mutation;
};
