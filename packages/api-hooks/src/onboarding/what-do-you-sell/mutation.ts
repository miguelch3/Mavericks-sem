import type { APIOptions, BusinessProduct } from '@mavericks/types';
import {
  APIErrorCode,
  APIHandledError,
  BusinessProductSchema,
  MCCData,
} from '@mavericks/types';

import { axios } from '@/api-hooks/utils/axios';
import { APIEndpoints } from '@/api-hooks/utils/endpoints';
import { APIFieldKey } from '@/api-hooks/utils/form-fields';

export const setWhatDoYouSell = async (
  input: BusinessProduct
): Promise<void> => {
  const { description, category, subcategory, website } =
    BusinessProductSchema.parse(input);

  const mccIrisData = await axios.get<APIOptions>({
    url: APIEndpoints.GET_LEAD_FIELD_OPTIONS,
    urlParams: { id: APIFieldKey.categoryType },
  });

  const [mccCode, mccData] =
    Object.entries(MCCData).find(
      ([, value]) =>
        value.baseCategory === category && value.description === subcategory
    ) || [];

  const mccIrisCategory = mccIrisData.dropdown.find(
    (row) => row.value === mccData?.irisCategory
  );

  if (!mccCode || !mccData || !mccIrisCategory) {
    throw new APIHandledError(
      'Invalid MCC code',
      APIErrorCode.INVALID_MCC_CODE
    );
  }

  await axios.patchIrisData({
    payload: {
      fields: [
        {
          id: APIFieldKey.businessProductDescription,
          value: description,
        },
        {
          id: APIFieldKey.categoryType,
          value: mccIrisCategory.key,
        },
        {
          id: APIFieldKey.subCategoryType,
          value: mccData.description,
        },
        {
          id: APIFieldKey.mccCode,
          value: mccCode,
        },
        {
          id: APIFieldKey.businessProductWebsite,
          value: website,
        },
        {
          id: APIFieldKey.underwritingMccCode,
          value: mccCode,
        },
      ],
    },
  });
};
