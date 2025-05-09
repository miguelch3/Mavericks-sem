import type { FormKeyDef, OwnerFormKeyDef } from '@mavericks/types';
import {
  AppEnvironment,
  ProductionFieldKeys,
  ProductionOwnerFieldKeys,
  StagingFieldKeys,
  StagingOwnerFieldKeys,
} from '@mavericks/types';
import type { FC } from 'react';

import { clientConfig as config } from '@/config/client';

export type StepFormProps = {
  toNextStep: () => void;
  toPreviousStep: () => void;
  setOverrideForm?: (Component: StepFormComponentType) => void;
};

export type StepFormComponentType<T = object> = FC<T & StepFormProps>;

// Export depending on environment
export const APIFieldKey: FormKeyDef =
  config.app.env === AppEnvironment.PRODUCTION
    ? ProductionFieldKeys
    : StagingFieldKeys;

export const APIOwnerFieldKey: OwnerFormKeyDef =
  config.app.env === AppEnvironment.PRODUCTION
    ? ProductionOwnerFieldKeys
    : StagingOwnerFieldKeys;
