import { zodResolver } from '@hookform/resolvers/zod';
import type { OwnerIndex, OwnerInformationFields } from '@mavericks/types';
import { OwnerInformationSchema } from '@mavericks/types';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { StepFormComponentType } from '@/common-types/form';
import { InputsWrapper } from '@/components/forms/onboarding/inputs-wrapper';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { clientConfig as config } from '@/config/client';
import { useOwnersData } from '@/hooks/use-owners-data';

import { OwnerEnterpriseInfoInputs } from './enterprise-info-inputs';
import { OwnerNameInputs } from './name-inputs';
import { OwnerOtherFieldsInputs } from './other-fields-inputs';
import { OwnerPersonalInfoInputs } from './personal-info-inputs';
import { OwnerInformationSubtitle } from './subtitle';

type Props = {
  title?: string;
  subtitle?: string;
  owner: OwnerInformationFields | null;
  isLoading?: boolean;
  index: OwnerIndex;
  onSubmitOwner: SubmitHandler<OwnerInformationFields>;
};

export const OwnerInformationForm: StepFormComponentType<Props> = ({
  title,
  subtitle,
  toNextStep,
  toPreviousStep,
  owner,
  isLoading,
  index,
  onSubmitOwner,
}) => {
  const { t } = useTranslation('registration');

  const { remainingAssignableOwnership } = useOwnersData(index);

  // State
  const [error, setError] = useState<unknown>(null);

  const form = useForm<OwnerInformationFields>({
    mode: config.app.form.validationMode,
    defaultValues: {
      ...owner,
      jobTitle: owner?.jobTitle || undefined,
    },
    resolver: zodResolver(OwnerInformationSchema(remainingAssignableOwnership)),
  });
  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<OwnerInformationFields> = async (data) => {
    try {
      await onSubmitOwner(data);
      toNextStep();
    } catch (e) {
      setError(e);
    }
  };

  // Labels
  const defaultTitle = t('verify-that-you-represent-title');
  const fullNameHelp = t('inputs:full-name-help');

  const loading = isLoading ?? false;

  return (
    <OnboardingFormWrapper<OwnerInformationFields>
      form={form}
      onSubmit={handleSubmit(onSubmit)}
      onGoBack={toPreviousStep}
      title={title ?? defaultTitle}
      subtitle={subtitle ?? <OwnerInformationSubtitle />}
      loading={loading}
      error={error}
    >
      <InputsWrapper>
        <OwnerNameInputs
          control={control}
          loading={loading}
          help={fullNameHelp}
        />

        <OwnerEnterpriseInfoInputs
          control={control}
          loading={loading}
          ownerIndex={index}
        />

        <OwnerPersonalInfoInputs
          control={control}
          loading={loading}
          form={form}
        />

        <OwnerOtherFieldsInputs control={control} loading={loading} />
      </InputsWrapper>
    </OnboardingFormWrapper>
  );
};
