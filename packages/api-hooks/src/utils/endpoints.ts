export const APIEndpoints = {
  REGISTER_PHONE_NUMBER: 'onboarding/register_number',
  VERIFY_PHONE_NUMBER_OTP: 'onboarding/verify_number',
  REGISTER_LEAD: 'onboarding/lead',
  PATCH_LEAD_INFORMATION: 'onboarding/lead/:leadId',
  GET_LEAD_FIELD_OPTIONS: 'onboarding/lead/field/:id',
  GENERATE_AGREEMENT: 'onboarding/application/:id/signature',
  GET_MERCHANT_INFO: 'onboarding/status',
  GET_LEAD_INFORMATION: 'onboarding/lead/:leadId',
  CHECK_SIGNATURE: 'onboarding/application/:leadId/signed',
  // Main owner sign
  GET_CONTRACT: 'onboarding/application/:application_id/contract',
  SIGN_CONTRACT: 'onboarding/application/:application_id/sign',
  // Other owners sign
  GET_OTHERS_CONTRACT: 'contracts/:lead_signature_id',
  SIGN_MAIN_OWNER_CONTRACT: 'onboarding/application/:application_id/sign',
  SIGN_OTHERS_CONTRACT: 'contracts/sign',
} as const;
