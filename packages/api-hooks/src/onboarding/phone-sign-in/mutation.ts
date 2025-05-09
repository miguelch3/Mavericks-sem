import { axios } from '@/api-hooks/utils/axios';
import { APIEndpoints } from '@/api-hooks/utils/endpoints';
import type { PhoneSignInFieldsType } from '@/types/forms';
import { PhoneSignInFieldsSchema } from '@/types/forms';

export const sendOTP = async (input: PhoneSignInFieldsType): Promise<void> => {
  const { phone } = PhoneSignInFieldsSchema.parse(input);

  await axios.post({
    url: APIEndpoints.REGISTER_PHONE_NUMBER,
    payload: { phone },
  });
};
