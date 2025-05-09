import { zodResolver } from '@hookform/resolvers/zod';
import { useSendOTPMutation } from '@mavericks/api-hooks';
import { useRegisterBusinessStore, useSessionStore } from '@mavericks/store';
import type { PhoneSignInFieldsType } from '@mavericks/types';
import {
  MIN_PHONE_LENGTH_WITH_CHARS,
  PhoneSignInFieldsSchema,
} from '@mavericks/types';
import { FormItem, USPhoneNumberInput } from '@mavericks/ui';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { StepFormComponentType } from '@/common-types/form';
import { InputsWrapper } from '@/components/forms/onboarding/inputs-wrapper';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { clientConfig as config } from '@/config/client';

import { PhoneSignInHelpMessage } from './help-message';
import PhoneSignInInputHelp from './input-help';

const PhoneSignInForm: StepFormComponentType = ({ toNextStep }) => {
  const { t } = useTranslation('registration');

  const { mutateAsync: sendOTP, isPending } = useSendOTPMutation();

  const sessionStore = useSessionStore();
  const businessStore = useRegisterBusinessStore();
  const [error, setError] = useState<unknown>(null);

  const form = useForm<PhoneSignInFieldsType>({
    mode: config.app.form.validationMode,
    values: { phone: businessStore.phone },
    resolver: zodResolver(PhoneSignInFieldsSchema),
  });
  const { control } = form;

  const onSubmit: SubmitHandler<PhoneSignInFieldsType> = async ({ phone }) => {
    setError(null);

    sessionStore.clear();
    businessStore.clear();

    try {
      if (!config.demo.active) {
        await sendOTP({ phone });
      }

      businessStore.setPhone(phone);
      setError(null);
      toNextStep();
    } catch (e) {
      setError(e);
    }
  };

  // Labels
  const title = t('lets-get-started-title');
  const subtitle = t('lets-get-started-subtitle');

  const mobilePhoneInputLabel = t('inputs:mobile-phone-label');
  const mobilePhoneInputPlaceholder = t('inputs:mobile-phone-placeholder');

  const iAcknowledgeLabel = t('common:i-acknowledge');

  return (
    <OnboardingFormWrapper<PhoneSignInFieldsType>
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
      title={title}
      subtitle={subtitle}
      loading={isPending}
      error={error}
      buttonMessage={<PhoneSignInHelpMessage />}
      buttonLabel={iAcknowledgeLabel}
    >
      <InputsWrapper>
        <FormItem
          control={control}
          name="phone"
          label={mobilePhoneInputLabel}
          help={<PhoneSignInInputHelp />}
          errorVars={{
            min: MIN_PHONE_LENGTH_WITH_CHARS,
          }}
        >
          <USPhoneNumberInput
            name="get-started-phone-input"
            placeholder={mobilePhoneInputPlaceholder}
          />
        </FormItem>
      </InputsWrapper>
    </OnboardingFormWrapper>
  );
};

export default PhoneSignInForm;
