import { AppEnvironment } from '@mavericks/types';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {},

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_APP_ENV: z
      .nativeEnum(AppEnvironment)
      .default(AppEnvironment.DEVELOPMENT),

    NEXT_PUBLIC_HARDWARE_ID: z.string().min(1).optional().default('38'),
    NEXT_PUBLIC_PRICING_MODEL: z
      .string()
      .min(1)
      .optional()
      .default('TSYS - 2 Tier [TPApp]'),
  },

  runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,

    NEXT_PUBLIC_HARDWARE_ID: process.env.NEXT_PUBLIC_HARDWARE_ID,
    NEXT_PUBLIC_PRICING_MODEL: process.env.NEXT_PUBLIC_PRICING_MODEL,
  },
});
