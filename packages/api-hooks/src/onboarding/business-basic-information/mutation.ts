import { formatToIrisPhoneNumber } from '@mavericks/shared';
import {
  APIErrorCode,
  APIHandledError,
  AppEnvironment,
  BusinessBasicInformationSchema,
  IrisTINValue,
} from '@mavericks/types';
import z from 'zod';

import { config } from '@/api-hooks/config/client';
import { getIrisAddressStateValue } from '@/api-hooks/utils/address';
import { axios } from '@/api-hooks/utils/axios';
import { APIFieldKey } from '@/api-hooks/utils/form-fields';

const BusinessBasicInformationInputSchema = BusinessBasicInformationSchema.omit(
  {
    businessType: true,
  }
).extend({
  yearsInBusiness: z.number(),
});

export type BusinessBasicInformationInput = z.infer<
  typeof BusinessBasicInformationInputSchema
>;

export const setBusinessBasicInfo = async (
  input: BusinessBasicInformationInput
): Promise<void> => {
  // Destructure input
  const {
    dbaAddress: inputDbaAddress,
    businessPhone: inputBusinessPhone,
    legalAddress,
    legalBusinessName,
    legalPhone,
    dbaName,
    businessEstablishedDate,
    tinData,
    contactName,
    contactEmail,
    yearsInBusiness,
  } = BusinessBasicInformationInputSchema.parse(input);

  // Fields fallback
  const dbaAddress = inputDbaAddress.isRequired
    ? inputDbaAddress
    : legalAddress;

  const businessPhone = inputBusinessPhone.isRequired
    ? inputBusinessPhone.phone
    : legalPhone;

  // Legal Address values
  const legalState = await getIrisAddressStateValue(legalAddress.address.state);

  if (!legalState) {
    throw new APIHandledError(
      'Invalid legal address state',
      APIErrorCode.BAD_REQUEST
    );
  }

  // DBA Address values
  const dbaState = await getIrisAddressStateValue(
    dbaAddress?.address?.state || ''
  );

  if (!dbaState) {
    throw new APIHandledError(
      'Invalid dba address state',
      APIErrorCode.BAD_REQUEST
    );
  }

  // Format & payload
  const legalAddressLine =
    `${legalAddress.address.addressOne} ${legalAddress.address.addressTwo ?? ''}`.trim();
  const dbaAddressLine =
    `${dbaAddress?.address?.addressOne ?? ''} ${dbaAddress?.address?.addressTwo ?? ''}`.trim();

  const legalAddressZip = legalAddress.address.zip.replaceAll('-', '');
  const dbaAddressZip = dbaAddress?.address?.zip.replaceAll('-', '') || '';

  const businessAsName = dbaName || legalBusinessName;

  const formattedTIN = tinData.tin.replaceAll('-', '');
  const formattedLegalPhone = formatToIrisPhoneNumber(legalPhone);
  const formattedBusinessPhone = businessPhone
    ? formatToIrisPhoneNumber(businessPhone)
    : '';

  const formattedEstablishedDate = businessEstablishedDate.format('MM/DD/YYYY');
  const formattedYearsInBusiness = yearsInBusiness.toString();

  const tsysEquipmentTemplate =
    config.app.env === AppEnvironment.PRODUCTION ? '2' : '1';

  await axios.patchIrisData({
    payload: {
      fields: [
        { id: APIFieldKey.legalBusinessName, value: legalBusinessName },
        {
          id: APIFieldKey.legalBusinessPhone,
          value: formattedLegalPhone,
        },
        {
          id: APIFieldKey.legalBusinessAddressOne,
          value: legalAddressLine,
        },
        {
          id: APIFieldKey.legalBusinessCity,
          value: legalAddress.address.city,
        },
        {
          id: APIFieldKey.legalBusinessState,
          value: legalState,
        },
        {
          id: APIFieldKey.legalBusinessZipCode,
          value: legalAddressZip,
        },

        {
          id: APIFieldKey.dbaAddressOne,
          value: dbaAddressLine,
        },
        {
          id: APIFieldKey.dbaAddressCity,
          value: dbaAddress?.address?.city,
        },
        {
          id: APIFieldKey.dbaAddressState,
          value: dbaState,
        },
        {
          id: APIFieldKey.dbaAddressZipCode,
          value: dbaAddressZip,
        },

        {
          id: APIFieldKey.businessPhone,
          value: formattedBusinessPhone,
        },
        { id: APIFieldKey.legalBusinessTIN, value: formattedTIN },
        { id: APIFieldKey.businessAs, value: businessAsName },
        {
          id: APIFieldKey.businessEstablishedDate,
          value: formattedEstablishedDate,
        },
        {
          id: APIFieldKey.specialRelation,
          value: '22',
        },
        {
          id: APIFieldKey.selectedTIN,
          value: IrisTINValue[tinData.selectedTin],
        },
        {
          id: APIFieldKey.tsysBoardingProfile,
          value: '1',
        },
        {
          id: APIFieldKey.tsysEquipmentTemplate,
          value: tsysEquipmentTemplate,
        },
        {
          id: APIFieldKey.businessContactName,
          value: contactName,
        },
        {
          id: APIFieldKey.businessContactEmail,
          value: contactEmail,
        },
        {
          id: APIFieldKey.yearsInBusiness,
          value: formattedYearsInBusiness,
        },
      ],
    },
  });
};
