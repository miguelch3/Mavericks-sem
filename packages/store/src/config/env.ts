import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {},

  client: {
    NEXT_PUBLIC_TALUS_PB_KEY: z.string().min(1),
  },

  runtimeEnv: {
    NEXT_PUBLIC_TALUS_PB_KEY: process.env.NEXT_PUBLIC_TALUS_PB_KEY,
  },
});
