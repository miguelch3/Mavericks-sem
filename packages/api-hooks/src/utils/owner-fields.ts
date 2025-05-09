import type { OwnerFormKeyDef } from '@mavericks/types';
import {
  AppEnvironment,
  ProductionOwnerFieldKeys,
  StagingOwnerFieldKeys,
} from '@mavericks/types';

import { config } from '@/api-hooks/config/client';

export const APIOwnerFieldKey: OwnerFormKeyDef =
  config.app.env === AppEnvironment.PRODUCTION
    ? ProductionOwnerFieldKeys
    : StagingOwnerFieldKeys;
