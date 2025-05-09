import type { BusinessProduct } from '@mavericks/types';
import { BusinessProductSchema, MCCData } from '@mavericks/types';

import { APIFieldKey } from '@/common-types/form';

export const parseMainProduct = (
  data: Map<string, string | null>
): BusinessProduct => {
  const mainProduct: BusinessProduct = {
    description: data.get(APIFieldKey.businessProductDescription) ?? '',
    category: data.get(APIFieldKey.categoryType) || '',
    subcategory: data.get(APIFieldKey.subCategoryType) || '',
    website: data.get(APIFieldKey.businessProductWebsite) ?? '',
  };

  // MCC Code Data
  const mccCode = data.get(APIFieldKey.mccCode) || null;
  const mccCodeData = MCCData[mccCode || ''];

  // Overriding the iris value with mapped values
  if (mccCodeData) {
    mainProduct.category = mccCodeData.baseCategory;
    mainProduct.subcategory = mccCodeData.description;
  }

  return mainProduct;
};

export const parseMainProductWithValidation = (
  data: Map<string, string | null>
): BusinessProduct | null => {
  const mainProduct = parseMainProduct(data);
  const parsedProduct = BusinessProductSchema.safeParse(mainProduct);
  return parsedProduct.success ? parsedProduct.data : null;
};
