import type { z } from 'zod';

import { BusinessSchema } from '@/types/business/business';

export type BusinessBasicInformationFieldsType = z.infer<
  typeof BusinessBasicInformationFieldsSchema
>;

export const BusinessBasicInformationFieldsSchema = BusinessSchema.pick({
  legalBusinessName: true,
  legalAddress: true,
  legalPhone: true,
  tinData: true,
  businessEstablishedDate: true,
  dbaName: true,
  dbaAddress: true,
  businessPhone: true,
  contactName: true,
  contactEmail: true,
}).transform((data) => {
  const newData = { ...data };

  if (!newData.dbaAddress.isRequired) {
    newData.dbaAddress.address = undefined;
  }

  if (!newData.businessPhone.isRequired) {
    newData.businessPhone.phone = undefined;
  }

  return newData;
});
