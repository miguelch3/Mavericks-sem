import z from 'zod';

import type { SignOwnerOutput } from '@/api-hooks/merchant/agreement/sign/sign';
import {
  SignOwnerInputSchema,
  signOwnerMutation,
} from '@/api-hooks/merchant/agreement/sign/sign';

const SignMainOwnerInputSchema = SignOwnerInputSchema.extend({
  applicationId: z.string(),
});

export type SignMainOwnerInput = z.infer<typeof SignMainOwnerInputSchema>;

export const signMainOwnerMutation = async (
  input: SignMainOwnerInput
): Promise<SignOwnerOutput> => {
  const { contractSignatureHash, leadSignatureId, applicationId } =
    SignMainOwnerInputSchema.parse(input);

  return signOwnerMutation({
    input: {
      contractSignatureHash,
      leadSignatureId,
    },
    ownerType: 'main',
    applicationId,
  });
};
