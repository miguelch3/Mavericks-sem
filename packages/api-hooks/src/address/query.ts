import type { DropdownOption } from '@mavericks/types';
import { stateLabels } from '@mavericks/types';

export const getAddressStates = (): DropdownOption[] => {
  return Object.values(stateLabels).map((label) => ({
    label,
    value: label,
  }));
};
