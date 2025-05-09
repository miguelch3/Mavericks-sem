import { useMutation } from '@tanstack/react-query';

import type { PhoneSignInFieldsType } from '@/types/forms';

import { sendOTP } from './mutation';

export const useSendOTPMutation = () => {
  const mutation = useMutation({
    mutationKey: ['send-otp'],
    mutationFn: (input: PhoneSignInFieldsType) => sendOTP(input),
  });

  return mutation;
};
