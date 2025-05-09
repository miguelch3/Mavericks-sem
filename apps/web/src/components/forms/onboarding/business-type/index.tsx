import { zodResolver } from '@hookform/resolvers/zod';
import {
  useBusinessTypeList,
  useSetBusinessTypeMutation,
} from '@mavericks/api-hooks';
import { useRegisterBusinessStore } from '@mavericks/store';
import type { BusinessTypeFieldsType } from '@mavericks/types';
import { BusinessTypeFieldsSchema } from '@mavericks/types';
import { FormItem } from '@mavericks/ui';
import { Select } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { StepFormComponentType } from '@/common-types/form';
import { InputsWrapper } from '@/components/forms/onboarding/inputs-wrapper';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { clientConfig as config } from '@/config/client';

export const BusinessTypeForm: StepFormComponentType = ({
  toNextStep,
  toPreviousStep,
}) => {
  const { t } = useTranslation('registration');

  const { mutateAsync: setType, isPending: setTypeLoading } =
    useSetBusinessTypeMutation();
  const { data: options, isPending: optionsLoading } = useBusinessTypeList({
    refetchOnWindowFocus: false,
  });

  const [error, setError] = useState<unknown>(null);

  const businessStore = useRegisterBusinessStore();

  const form = useForm<BusinessTypeFieldsType>({
    mode: config.app.form.validationMode,
    defaultValues: {
      businessType: businessStore.business.businessType || undefined,
    },
    resolver: zodResolver(BusinessTypeFieldsSchema),
  });

  const onSubmit: SubmitHandler<BusinessTypeFieldsType> = async ({
    businessType,
  }) => {
    try {
      if (!config.demo.active) {
        await setType({
          businessType,
        });
      }

      businessStore.addInformation({ businessType });
      toNextStep();
    } catch (e) {
      setError(e);
    }
  };

  // Labels
  const title = t('tell-us-about-your-business-title');
  const subtitle = t('tell-us-about-your-business-subtitle');

  const businessTypeLabel = t('inputs:business-type-label');
  const businessTypePlaceholder = t('inputs:business-type-placeholder');

  const disabled = optionsLoading || setTypeLoading;

  return (
    <OnboardingFormWrapper<BusinessTypeFieldsType>
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
      onGoBack={toPreviousStep}
      title={title}
      subtitle={subtitle}
      loading={setTypeLoading}
      error={error}
    >
      <InputsWrapper>
        <FormItem
          name="businessType"
          control={form.control}
          label={businessTypeLabel}
        >
          <Select
            data-cy="business-type-select"
            className="w-full"
            size="large"
            placeholder={businessTypePlaceholder}
            loading={optionsLoading}
            disabled={disabled}
            allowClear
            showSearch
          >
            {options?.map((op) => (
              <Select.Option key={`${op.value}-option`} value={op.value}>
                {op.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </InputsWrapper>
    </OnboardingFormWrapper>
  );
};

export default BusinessTypeForm;
