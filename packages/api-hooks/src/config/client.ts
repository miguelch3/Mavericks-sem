import { env } from './env';

export const config = {
  api: {
    baseUrl: env.NEXT_PUBLIC_API_BASE_URL,
  },
  app: {
    env: env.NEXT_PUBLIC_APP_ENV,
  },
  data: {
    pricingModel: env.NEXT_PUBLIC_PRICING_MODEL,
    hardwareID: env.NEXT_PUBLIC_HARDWARE_ID,
  },
};
