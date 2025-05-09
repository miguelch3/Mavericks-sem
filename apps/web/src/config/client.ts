import { env } from './env';

export const clientConfig = {
  api: {
    baseUrl: env.NEXT_PUBLIC_API_BASE_URL,
    key: env.NEXT_PUBLIC_TALUS_PB_KEY,
    partnerKey: env.NEXT_PUBLIC_PARTNER_PB_KEY,
  },
  app: {
    version: env.NEXT_PUBLIC_APP_VERSION,
    env: env.NEXT_PUBLIC_APP_ENV,
    form: {
      validationMode: env.NEXT_PUBLIC_FORM_VALIDATION_MODE,
    },
  },
  google: {
    apiKey: env.NEXT_PUBLIC_GOOGLE_API_KEY,
  },
  demo: {
    active: env.NEXT_PUBLIC_DEMO_MODE,
    sourceNumber: env.NEXT_PUBLIC_DEMO_SOURCE_NUMBER,
  },
  links: {
    help: env.NEXT_PUBLIC_HELP_LINK,
    applicationAndAgreements: env.NEXT_PUBLIC_APPLICATION_AND_AGREEMENTS_LINK,
    terms: env.NEXT_PUBLIC_TERMS_LINK,
    privacyPolicy: env.NEXT_PUBLIC_PRIVACY_POLICY_LINK,
    personalGuaranty: env.NEXT_PUBLIC_PERSONAL_GUARANTY_LINK,
    bankTerms: env.NEXT_PUBLIC_BANK_TERMS_LINK,
    achTerms: env.NEXT_PUBLIC_ACH_TERMS_LINK,
    eSignDisclosure: env.NEXT_PUBLIC_E_SIGN_DISCLOSURE_LINK,
    defaultAgreementUrl: env.NEXT_PUBLIC_DEFAULT_AGREEMENT_URL,
  },
  contact: {
    email: env.NEXT_PUBLIC_CONTACT_EMAIL,
    phone: env.NEXT_PUBLIC_CONTACT_PHONE,
  },
  data: {
    hardwarePrice: env.NEXT_PUBLIC_HARDWARE_PRICE,
    cardPresentPercentage: env.NEXT_PUBLIC_CARD_PRESENT_PERCENTAGE,
    cardPresentFeeAmount: env.NEXT_PUBLIC_CARD_PRESENT_FEE_AMOUNT,
    nonCardPresentPercentage: env.NEXT_PUBLIC_NON_CARD_PRESENT_PERCENTAGE,
    nonCardPresentFeeAmount: env.NEXT_PUBLIC_NON_CARD_PRESENT_FEE_AMOUNT,
    monthlyServiceFee: env.NEXT_PUBLIC_MONTHLY_SERVICE_FEE,
  },
};
