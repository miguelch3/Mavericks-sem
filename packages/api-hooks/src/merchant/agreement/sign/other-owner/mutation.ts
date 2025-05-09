import type {
  SignOwnerInput,
  SignOwnerOutput,
} from '@/api-hooks/merchant/agreement/sign/sign';
import {
  SignOwnerInputSchema,
  signOwnerMutation,
} from '@/api-hooks/merchant/agreement/sign/sign';

export const signOtherOwnerMutation = async (
  input: SignOwnerInput
): Promise<SignOwnerOutput> => {
  const { contractSignatureHash, leadSignatureId } =
    SignOwnerInputSchema.parse(input);

  return signOwnerMutation({
    input: {
      contractSignatureHash,
      leadSignatureId,
    },
    ownerType: 'other',
  });
};
