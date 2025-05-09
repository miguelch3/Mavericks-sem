import { ReloadOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterBusinessStore, useSessionStore } from '@mavericks/store';
import type { VerifyOTPFieldsType } from '@mavericks/types';
import {
  APIErrorCode,
  ClientFormError,
  VerifyOTPFieldsSchema,
} from '@mavericks/types';
import { FormItem, OTPInput } from '@mavericks/ui';
import { Button } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useVerifyOTPMutation } from '@/api-hooks/onboarding';
import type { StepFormComponentType } from '@/common-types/form';
import { InputsWrapper } from '@/components/forms/onboarding/inputs-wrapper';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { clientConfig as config } from '@/config/client';
import { useGetMerchantData } from '@/hooks/use-get-merchant-data';

import { VerifyOTPHelpMessage } from './help-message';

export const VerifyOTPForm: StepFormComponentType = ({ toPreviousStep }) => {
  const { t } = useTranslation('registration');
  const { mutateAsync: verifyOTP, isPending } = useVerifyOTPMutation();

  const [error, setError] = useState<unknown>(null);

  const sessionStore = useSessionStore();
  const getMerchantData = useGetMerchantData();

  const phone = useRegisterBusinessStore((s) => s.phone);

  const form = useForm<VerifyOTPFieldsType>({
    mode: config.app.form.validationMode,
    resolver: zodResolver(VerifyOTPFieldsSchema),
  });
  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<VerifyOTPFieldsType> = async ({ code }) => {
    const phoneToUse = config.demo.active ? config.demo.sourceNumber : phone;

    try {
      // Auth
      const {
        id,
        token,
        lead_id: leadId,
        lead_onboarding_status: status,
      } = await verifyOTP({
        code,
        phone: phoneToUse,
        agent: sessionStore.agentId,
        publishable_key: sessionStore.pbKey,
        attributionData: sessionStore.attributionUrlData,
      });

      sessionStore.setMerchantId(id);
      sessionStore.saveAuth(token);

      if (!leadId || !status) {
        setError(new ClientFormError(APIErrorCode.INTERNAL_SERVER_ERROR));
        return;
      }

      // Load merchant & lead data (next step will be decided here)
      await getMerchantData.loadLeadData({
        leadId,
        status,
        onError: setError,
      });
    } catch (e) {
      setError(e);
    }
  };

  // Labels
  const title = t('verify-otp-title');
  const subtitle = t('verify-otp-subtitle');

  const verifyOtpLabel = t('inputs:verify-otp-label');
  const resendCodeLabel = t('resend-code');

  const loading = isPending || getMerchantData.isLoading;

  return (
    <OnboardingFormWrapper<VerifyOTPFieldsType>
      form={form}
      onSubmit={handleSubmit(onSubmit)}
      onGoBack={toPreviousStep}
      title={title}
      subtitle={subtitle}
      loading={loading}
      error={error}
      buttonMessage={<VerifyOTPHelpMessage />}
    >
      <InputsWrapper>
        <div>
          <FormItem
            control={control}
            name="code"
            label={verifyOtpLabel}
            className="!mb-0"
          >
            <OTPInput />
          </FormItem>

          <Button
            type="link"
            className="!mt-3 !px-0 !text-sm"
            icon={<ReloadOutlined />}
          >
            {resendCodeLabel}
          </Button>
        </div>
      </InputsWrapper>
    </OnboardingFormWrapper>
  );
};

export default VerifyOTPForm;
