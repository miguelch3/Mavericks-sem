import type { FormKeyDef } from '@mavericks/types';
import {
  AppEnvironment,
  ProductionFieldKeys,
  StagingFieldKeys,
} from '@mavericks/types';

import { config } from '@/api-hooks/config/client';

// Export depending on environment
export const APIFieldKey: FormKeyDef =
  config.app.env === AppEnvironment.PRODUCTION
    ? ProductionFieldKeys
    : StagingFieldKeys;
