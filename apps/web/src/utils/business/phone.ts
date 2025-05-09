import type { BusinessPhone } from '@mavericks/types';
import { BusinessPhoneSchema } from '@mavericks/types';

import { APIFieldKey } from '@/common-types/form';

export const parseBusinessPhone = (
  data: Map<string, string | null>,
  legalPhone: string
): BusinessPhone => {
  const rawBusinessPhone = data.get(APIFieldKey.businessPhone);
  const phone = rawBusinessPhone?.replaceAll('-', '') || undefined;

  if (phone && phone.length > 0 && phone !== legalPhone) {
    return {
      isRequired: true,
      phone,
    };
  }

  return { isRequired: false };
};

export const parseBusinessPhoneWithValidation = (
  data: Map<string, string | null>,
  legalPhone: string
): BusinessPhone => {
  const businessPhone = parseBusinessPhone(data, legalPhone);
  const parsedBusinessPhone = BusinessPhoneSchema.safeParse(businessPhone);
  return parsedBusinessPhone.success
    ? parsedBusinessPhone.data
    : { isRequired: false };
};
