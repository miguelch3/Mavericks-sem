import { zodResolver } from '@hookform/resolvers/zod';
import { useSetCurrentSalesMutation } from '@mavericks/api-hooks';
import { useRegisterBusinessStore } from '@mavericks/store';
import type { CurrentSalesFields } from '@mavericks/types';
import { CurrentSalesSchema } from '@mavericks/types';
import { FormItem } from '@mavericks/ui';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { StepFormComponentType } from '@/common-types/form';
import { InputsWrapper } from '@/components/forms/onboarding/inputs-wrapper';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { clientConfig as config } from '@/config/client';

import { SalesPercentagesFields } from './sales-percentages';
import { SalesValueFields } from './sales-value-fields';

const CurrentSalesForm: StepFormComponentType = ({
  toNextStep,
  toPreviousStep,
}) => {
  const { t } = useTranslation('registration');

  const addInformation = useRegisterBusinessStore((s) => s.addInformation);
  const initialCurrentSales = useRegisterBusinessStore(
    (s) => s.business.currentSales
  );

  const form = useForm<CurrentSalesFields>({
    mode: config.app.form.validationMode,
    resolver: zodResolver(CurrentSalesSchema),
    defaultValues: initialCurrentSales,
  });
  const { control, handleSubmit } = form;

  const [error, setError] = useState<unknown>(null);

  const { mutateAsync: setCurrentSales, isPending } =
    useSetCurrentSalesMutation();

  const onSubmit: SubmitHandler<CurrentSalesFields> = async (currentSales) => {
    try {
      if (!config.demo.active) {
        await setCurrentSales(currentSales);
      }

      addInformation({ currentSales });
      toNextStep();
    } catch (e) {
      setError(e);
    }
  };

  // Labels
  const title = t('current-sales-title');
  const subtitle = t('current-sales-subtitle');

  const percentageOfSalesLabel = t('inputs:percentage-of-sales-label');

  return (
    <OnboardingFormWrapper<CurrentSalesFields>
      form={form}
      onSubmit={handleSubmit(onSubmit)}
      onGoBack={toPreviousStep}
      title={title}
      subtitle={subtitle}
      loading={isPending}
      error={error}
    >
      <InputsWrapper>
        <SalesValueFields control={control} />

        <FormItem
          control={control}
          label={percentageOfSalesLabel}
          name="salesPercentage"
        >
          <SalesPercentagesFields
            control={control}
            error={!!form.formState.errors.salesPercentage?.message}
          />
        </FormItem>
      </InputsWrapper>
    </OnboardingFormWrapper>
  );
};

export default CurrentSalesForm;
