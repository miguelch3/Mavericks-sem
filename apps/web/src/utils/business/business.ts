import type {
  Business,
  BusinessFieldRow,
  BusinessOwner,
} from '@mavericks/types';
import dayjs from 'dayjs';

import { parseBankAccount } from './bank';
import { parseBusinessBasicInformation } from './basic-information';
import { parseHardware } from './hardware';
import { parseOwnerData } from './owners';
import { parseMainProduct } from './product';
import { parseCurrentSales } from './sales';

export const parseApiFieldsDataToBusiness = (
  data: BusinessFieldRow[]
): Business => {
  // Get fields and values into a map
  const fieldsMap = new Map<string, string | null>();
  data.forEach((row) => fieldsMap.set(String(row.id), row.value));

  // Parse data
  const basicInformation = parseBusinessBasicInformation(fieldsMap);
  const owners = parseOwnerData(fieldsMap);
  const mainProduct = parseMainProduct(fieldsMap);
  const currentSales = parseCurrentSales(fieldsMap);
  const bankAccount = parseBankAccount(fieldsMap);
  const hardware = parseHardware(fieldsMap);

  // Owners
  const businessInformation: Business = {
    ...basicInformation,
    businessEstablishedDate:
      basicInformation.businessEstablishedDate || dayjs(),
    //
    mainOwner: owners.ownerOne as BusinessOwner,
    owners,
    //
    mainProduct,
    currentSales,
    bankAccount,
    selectedDevices: hardware,
  };

  return businessInformation;
};
