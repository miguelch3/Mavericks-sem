import { formatEIN, formatSSNOrITIN } from '@mavericks/shared';
import type { Business, BusinessTIN } from '@mavericks/types';
import { TINOption, TINSchema } from '@mavericks/types';

import { APIFieldKey } from '@/common-types/form';

export const parseBusinessTin = (
  data: Map<string, string | null>
): BusinessTIN => {
  const tin = data.get(APIFieldKey.legalBusinessTIN) || '';
  const selectedTin = data.get(APIFieldKey.selectedTIN) as TINOption;

  let formattedTin;
  switch (selectedTin) {
    case TINOption.EIN:
      formattedTin = formatEIN(tin);
      break;
    case TINOption.ITIN:
    case TINOption.SSN:
      formattedTin = formatSSNOrITIN(tin);
      break;
    default:
      formattedTin = tin;
  }

  const tinData = {
    selectedTin,
    tin: formattedTin,
  };

  return tinData;
};

export const parseTinDataWithValidation = (
  data: Map<string, string | null>
): Business['tinData'] | null => {
  const tinData = parseBusinessTin(data);
  const parsedTinData = TINSchema.safeParse(tinData);

  return parsedTinData.success ? parsedTinData.data : null;
};
