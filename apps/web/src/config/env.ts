import { AppEnvironment } from '@mavericks/types';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']),
  },
  client: {
    // API
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_TALUS_PB_KEY: z.string().min(1),
    NEXT_PUBLIC_PARTNER_PB_KEY: z.string().min(1),

    // App
    NEXT_PUBLIC_APP_VERSION: z.string().default('v0.0.0'),
    NEXT_PUBLIC_APP_ENV: z
      .nativeEnum(AppEnvironment)
      .default(AppEnvironment.DEVELOPMENT),
    NEXT_PUBLIC_FORM_VALIDATION_MODE: z
      .enum(['all', 'onBlur', 'onChange', 'onSubmit', 'onTouched'])
      .optional()
      .default('onBlur'),

    // Google
    NEXT_PUBLIC_GOOGLE_API_KEY: z.string().min(1),

    // Links
    NEXT_PUBLIC_HELP_LINK: z.string().url().default('https://taluspay.com'),
    NEXT_PUBLIC_APPLICATION_AND_AGREEMENTS_LINK: z
      .string()
      .url()
      .default('https://taluspay.com/legal/merchant-application-agreement'),
    NEXT_PUBLIC_TERMS_LINK: z
      .string()
      .url()
      .default('https://taluspay.com/terms-of-service'),
    NEXT_PUBLIC_PRIVACY_POLICY_LINK: z
      .string()
      .url()
      .default('https://taluspay.com/privacy-policy'),
    NEXT_PUBLIC_PERSONAL_GUARANTY_LINK: z
      .string()
      .url()
      .default('https://taluspay.com/legal/personal-guaranty'),
    NEXT_PUBLIC_BANK_TERMS_LINK: z
      .string()
      .url()
      .default('https://taluspay.com/legal/bank-terms'),
    NEXT_PUBLIC_ACH_TERMS_LINK: z
      .string()
      .url()
      .default('https://taluspay.com/legal/ach-terms'),
    NEXT_PUBLIC_E_SIGN_DISCLOSURE_LINK: z
      .string()
      .url()
      .default('https://taluspay.com/legal/e-sign-disclosure'),
    NEXT_PUBLIC_DEFAULT_AGREEMENT_URL: z
      .string()
      .url()
      .default('https://taluspay.com'),

    // Contact
    NEXT_PUBLIC_CONTACT_EMAIL: z
      .string()
      .email()
      .default('support@taluspay.com'),
    NEXT_PUBLIC_CONTACT_PHONE: z.string().min(1).default('1-888-445-4812'),

    // Data
    NEXT_PUBLIC_HARDWARE_PRICE: z.string().min(1).default('200'),
    NEXT_PUBLIC_CARD_PRESENT_PERCENTAGE: z.string().min(1).default('2.60'),
    NEXT_PUBLIC_CARD_PRESENT_FEE_AMOUNT: z.string().min(1).default('15'),
    NEXT_PUBLIC_NON_CARD_PRESENT_PERCENTAGE: z.string().min(1).default('3.75'),
    NEXT_PUBLIC_NON_CARD_PRESENT_FEE_AMOUNT: z.string().min(1).default('20'),
    NEXT_PUBLIC_MONTHLY_SERVICE_FEE: z.string().min(1).default('59.99'),

    // DEMO
    NEXT_PUBLIC_DEMO_MODE: z
      .enum(['true', 'false'])
      .transform((val) => val === 'true')
      .default('false'),
    NEXT_PUBLIC_DEMO_SOURCE_NUMBER: z.string().min(1).default('9023852352'),
  },

  runtimeEnv: {
    // Server
    NODE_ENV: process.env.NODE_ENV,

    // API
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_TALUS_PB_KEY: process.env.NEXT_PUBLIC_TALUS_PB_KEY,
    NEXT_PUBLIC_PARTNER_PB_KEY: process.env.NEXT_PUBLIC_PARTNER_PB_KEY,

    // Links
    NEXT_PUBLIC_HELP_LINK: process.env.NEXT_PUBLIC_HELP_LINK,
    NEXT_PUBLIC_APPLICATION_AND_AGREEMENTS_LINK:
      process.env.NEXT_PUBLIC_APPLICATION_AND_AGREEMENTS_LINK,
    NEXT_PUBLIC_TERMS_LINK: process.env.NEXT_PUBLIC_TERMS_LINK,
    NEXT_PUBLIC_PRIVACY_POLICY_LINK:
      process.env.NEXT_PUBLIC_PRIVACY_POLICY_LINK,
    NEXT_PUBLIC_PERSONAL_GUARANTY_LINK:
      process.env.NEXT_PUBLIC_PERSONAL_GUARANTY_LINK,
    NEXT_PUBLIC_BANK_TERMS_LINK: process.env.NEXT_PUBLIC_BANK_TERMS_LINK,
    NEXT_PUBLIC_ACH_TERMS_LINK: process.env.NEXT_PUBLIC_ACH_TERMS_LINK,
    NEXT_PUBLIC_E_SIGN_DISCLOSURE_LINK:
      process.env.NEXT_PUBLIC_E_SIGN_DISCLOSURE_LINK,
    NEXT_PUBLIC_DEFAULT_AGREEMENT_URL:
      process.env.NEXT_PUBLIC_DEFAULT_AGREEMENT_URL,

    // Contact
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    NEXT_PUBLIC_CONTACT_PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE,

    // App
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_FORM_VALIDATION_MODE:
      process.env.NEXT_PUBLIC_FORM_VALIDATION_MODE,

    // Google
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,

    // Data
    NEXT_PUBLIC_HARDWARE_PRICE: process.env.NEXT_PUBLIC_HARDWARE_PRICE,
    NEXT_PUBLIC_CARD_PRESENT_PERCENTAGE:
      process.env.NEXT_PUBLIC_CARD_PRESENT_PERCENTAGE,
    NEXT_PUBLIC_CARD_PRESENT_FEE_AMOUNT:
      process.env.NEXT_PUBLIC_CARD_PRESENT_FEE_AMOUNT,
    NEXT_PUBLIC_NON_CARD_PRESENT_PERCENTAGE:
      process.env.NEXT_PUBLIC_NON_CARD_PRESENT_PERCENTAGE,
    NEXT_PUBLIC_NON_CARD_PRESENT_FEE_AMOUNT:
      process.env.NEXT_PUBLIC_NON_CARD_PRESENT_FEE_AMOUNT,
    NEXT_PUBLIC_MONTHLY_SERVICE_FEE:
      process.env.NEXT_PUBLIC_MONTHLY_SERVICE_FEE,

    // Demo
    NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
    NEXT_PUBLIC_DEMO_SOURCE_NUMBER: process.env.NEXT_PUBLIC_DEMO_SOURCE_NUMBER,
  },
});
