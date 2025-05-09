import type { DropdownOption } from '@mavericks/types';
import { MCCData } from '@mavericks/types';

export const getMCCCategories = (): DropdownOption[] => {
  const options = Array.from(
    new Set(Object.values(MCCData).map((mccData) => mccData.baseCategory))
  ).map((baseCategory) => ({ label: baseCategory, value: baseCategory }));

  return options;
};
