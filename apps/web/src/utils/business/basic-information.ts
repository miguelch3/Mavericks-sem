import type {
  BusinessBasicInfoLoading,
  BusinessBasicInformation,
} from '@mavericks/types';
import dayjs from 'dayjs';

import { APIFieldKey } from '@/common-types/form';

import { parseDbaAddress, parseLegalAddress } from './address';
import { parseBusinessPhone } from './phone';
import { parseBusinessTin } from './tin';

export const parseLegalBusinessData = (
  data: Map<string, string | null>
): Partial<BusinessBasicInformation> => {
  return {
    legalBusinessName: data.get(APIFieldKey.legalBusinessName) || '',
    businessType: data.get(APIFieldKey.businessType) || '',
    legalPhone:
      data.get(APIFieldKey.legalBusinessPhone)?.replaceAll('-', '') || '',
  };
};

export const parseBusinessType = (data: Map<string, string | null>): string => {
  return data.get(APIFieldKey.businessType) || '';
};

export const parseBusinessBasicInformation = (
  data: Map<string, string | null>
): BusinessBasicInfoLoading => {
  // Legal Business Data
  const legalName = data.get(APIFieldKey.legalBusinessName) || '';
  const businessType = data.get(APIFieldKey.businessType) || '';
  const legalPhone =
    data.get(APIFieldKey.legalBusinessPhone)?.replaceAll('-', '') || '';

  // Dba Name & contact info
  const dbaName = data.get(APIFieldKey.businessAs) || undefined;
  const contactName = data.get(APIFieldKey.businessContactName) || '';
  const contactEmail = data.get(APIFieldKey.businessContactEmail) || '';

  const establishedDate = data.get(APIFieldKey.businessEstablishedDate);
  const parsedDate = establishedDate ? dayjs(establishedDate) : undefined;

  // Parsed data
  const legalAddress = parseLegalAddress(data);
  const tinData = parseBusinessTin(data);
  const dbaAddress = parseDbaAddress(data, legalAddress);

  const businessPhone = parseBusinessPhone(data, legalPhone);

  // Business Basic Information
  const basicInformation: BusinessBasicInfoLoading = {
    legalBusinessName: legalName,
    dbaName: legalName !== dbaName ? dbaName : undefined,
    businessType,
    legalPhone,
    legalAddress,
    tinData,
    businessPhone,
    dbaAddress,
    contactName,
    contactEmail,
    businessEstablishedDate: parsedDate,
  };

  return basicInformation;
};
