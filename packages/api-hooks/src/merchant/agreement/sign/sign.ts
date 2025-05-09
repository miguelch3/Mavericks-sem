import z from 'zod';

import { axios } from '@/api-hooks/utils/axios';
import { APIEndpoints } from '@/api-hooks/utils/endpoints';

export const SignOwnerInputSchema = z.object({
  contractSignatureHash: z.string(),
  leadSignatureId: z.string(),
});

export type SignOwnerInput = z.infer<typeof SignOwnerInputSchema>;

const SignOwnerOutputSchema = z.object({
  message: z.string(),
});

export type SignOwnerOutput = z.infer<typeof SignOwnerOutputSchema>;

// Ensures that the correct parameters are passed to the signOwnerMutation function
type SignFnMainOwnerParams = {
  ownerType: 'main';
  input: SignOwnerInput;
  applicationId: string;
};

type SignFnOtherOwnerParams = {
  ownerType: 'other';
  input: SignOwnerInput;
  applicationId?: never; // This is not used for other owner and cannot be assigned if ownerType is 'other'
};

type SignFnParams = SignFnMainOwnerParams | SignFnOtherOwnerParams;

export const signOwnerMutation = async ({
  input,
  ownerType,
  applicationId,
}: SignFnParams): Promise<SignOwnerOutput> => {
  const { contractSignatureHash, leadSignatureId } =
    SignOwnerInputSchema.parse(input);

  const callUrl =
    ownerType === 'main'
      ? APIEndpoints.SIGN_MAIN_OWNER_CONTRACT
      : APIEndpoints.SIGN_OTHERS_CONTRACT;

  const urlParams =
    ownerType === 'main'
      ? {
          application_id: applicationId,
        }
      : undefined;

  const { message } = await axios.post<SignOwnerOutput>({
    url: callUrl,
    urlParams,
    payload: {
      contract_signature_hash: contractSignatureHash,
      lead_signature_id: leadSignatureId,
    },
  });

  return { message };
};
