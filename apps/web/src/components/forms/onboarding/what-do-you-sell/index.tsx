import { zodResolver } from '@hookform/resolvers/zod';
import {
  useMCCCategories,
  useMCCSubcategories,
  useSetWhatDoYouSellMutation,
} from '@mavericks/api-hooks';
import { useRegisterBusinessStore } from '@mavericks/store';
import type { WhatDoYouSellFields } from '@mavericks/types';
import {
  MAX_PRODUCT_DESCRIPTION_LENGTH,
  MAX_WEBSITE_LENGTH,
  MIN_PRODUCT_DESCRIPTION_LENGTH,
  WhatDoYouSellSchema,
} from '@mavericks/types';
import { FormItem, SpecialCharsRestrictedInput } from '@mavericks/ui';
import { Input, Select } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { StepFormComponentType } from '@/common-types/form';
import { InputsWrapper } from '@/components/forms/onboarding/inputs-wrapper';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { clientConfig as config } from '@/config/client';

const WhatDoYouSellForm: StepFormComponentType = ({
  toNextStep,
  toPreviousStep,
}) => {
  const { t } = useTranslation('registration');

  const addInformation = useRegisterBusinessStore((s) => s.addInformation);
  const primaryColor = useRegisterBusinessStore((s) => s.primaryColor);
  const initialMainProduct = useRegisterBusinessStore(
    (s) => s.business.mainProduct
  );

  const form = useForm<WhatDoYouSellFields>({
    mode: config.app.form.validationMode,
    resolver: zodResolver(WhatDoYouSellSchema),
    defaultValues: {
      mainProduct: {
        ...initialMainProduct,
        category: initialMainProduct.category || undefined,
        subcategory: initialMainProduct.subcategory || undefined,
      },
    },
  });
  const { control, handleSubmit, watch } = form;

  // State
  const [error, setError] = useState<unknown>(null);

  const category = watch('mainProduct.category');

  // API calls
  const { mutateAsync: setProduct, isPending } = useSetWhatDoYouSellMutation();
  const { data: categories, isPending: categoriesLoading } = useMCCCategories();
  const { data: subcategories, isPending: subcategoriesLoading } =
    useMCCSubcategories({
      category,
    });

  const onSubmit: SubmitHandler<WhatDoYouSellFields> = async ({
    mainProduct,
  }) => {
    try {
      if (!config.demo.active) {
        await setProduct({
          ...mainProduct,
          subcategory: mainProduct.subcategory || '',
        });
      }

      addInformation({ mainProduct });
      toNextStep();
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    if (category) {
      form.setValue('mainProduct.subcategory', null);
    }
  }, [category, form]);

  // Labels
  const title = t('what-do-you-sell-title');
  const subtitle = t('what-do-you-sell-subtitle');

  const describeWhatYouSellLabel1 = t('inputs:describe-what-you-sell-label-1');
  const describeWhatYouSellLabel2 = t('inputs:describe-what-you-sell-label-2');
  const describeWhatYouSellPlaceholder = t(
    'inputs:describe-what-you-sell-placeholder'
  );

  const categoryLabel = t('inputs:category-label');
  const categoryPlaceholder = t('inputs:category-placeholder');

  const subCategoryLabel = t('inputs:sub-category-label');
  const subCategoryPlaceholder = t('inputs:sub-category-placeholder');

  const yourWebsiteLabel = t('inputs:your-website-label');
  const yourWebsitePlaceholder = t('inputs:your-website-placeholder');

  const areSubcategoriesLoading =
    !!category && (subcategoriesLoading || isPending);

  return (
    <OnboardingFormWrapper<WhatDoYouSellFields>
      form={form}
      onSubmit={handleSubmit(onSubmit)}
      onGoBack={toPreviousStep}
      title={title}
      subtitle={subtitle}
      loading={isPending}
      error={error}
    >
      <InputsWrapper gap={10}>
        <div className="flex flex-col" style={{ color: primaryColor }}>
          <label className="lg:w-[550px]">{describeWhatYouSellLabel1}</label>
          <label>{describeWhatYouSellLabel2}</label>
        </div>

        <FormItem
          control={control}
          name="mainProduct.description"
          errorVars={{
            min: MIN_PRODUCT_DESCRIPTION_LENGTH,
            max: MAX_PRODUCT_DESCRIPTION_LENGTH,
          }}
        >
          <SpecialCharsRestrictedInput
            name="product-description-input"
            placeholder={describeWhatYouSellPlaceholder}
          />
        </FormItem>

        <FormItem
          control={control}
          label={categoryLabel}
          name="mainProduct.category"
        >
          <Select
            allowClear
            showSearch
            size="large"
            data-cy="product-category-select"
            className="w-full"
            placeholder={categoryPlaceholder}
            loading={categoriesLoading || isPending}
            disabled={categoriesLoading || isPending}
          >
            {categories?.map((op) => (
              <Select.Option key={`${op.label}-option`} value={op.label}>
                {op.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        <FormItem
          control={control}
          name="mainProduct.subcategory"
          label={subCategoryLabel}
        >
          <Select
            allowClear
            showSearch
            size="large"
            data-cy="product-subcategory-select"
            className="w-full"
            placeholder={subCategoryPlaceholder}
            options={subcategories}
            loading={areSubcategoriesLoading}
            disabled={areSubcategoriesLoading || !category}
          />
        </FormItem>

        <FormItem
          control={control}
          name="mainProduct.website"
          label={yourWebsiteLabel}
          errorVars={{
            max: MAX_WEBSITE_LENGTH,
          }}
        >
          <Input
            inputMode="url"
            data-cy="website-input"
            placeholder={yourWebsitePlaceholder}
          />
        </FormItem>
      </InputsWrapper>
    </OnboardingFormWrapper>
  );
};

export default WhatDoYouSellForm;
