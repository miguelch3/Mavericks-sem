import { zodResolver } from '@hookform/resolvers/zod';
import {
  useMainOwnerSignMutation,
  useOtherOwnerSignMutation,
} from '@mavericks/api-hooks';
import { useRegisterBusinessStore, useSessionStore } from '@mavericks/store';
import { Checkbox, Flex } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import type { StepFormComponentType } from '@/common-types/form';
import { FeesCard } from '@/components/fees-card/fees-card';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { PdfViewer } from '@/components/pdf-viewer/pdf-viewer';
import { clientConfig as config } from '@/config/client';

import { ButtonAgreementMessage } from './button-agreement-message';
import { ClickToSignParagraph } from './click-to-sign-paragraph';

const FormSchema = z.object({
  agreed: z.boolean().default(false),
});
type FormSchemaType = z.infer<typeof FormSchema>;

const ReviewPaymentsAndFeesForm: StepFormComponentType = ({
  toNextStep,
  toPreviousStep,
}) => {
  const { t } = useTranslation('registration');

  const [error, setError] = useState<unknown>(null);

  const form = useForm<FormSchemaType>({
    mode: config.app.form.validationMode,
    resolver: zodResolver(FormSchema),
  });
  const { handleSubmit, watch, control } = form;

  const url = useRegisterBusinessStore((s) => s.contractUrl);
  const signatureId = useRegisterBusinessStore((s) => s.signatureId);

  const leadId = useSessionStore((s) => s.leadId);
  const isOtherOwnerSigning = useSessionStore((s) => s.othersSigning);

  const agreed = watch('agreed');

  const {
    mutateAsync: signOtherOwner,
    isPending: isSigningOtherOwner,
    error: otherOwnerError,
  } = useOtherOwnerSignMutation();
  const {
    mutateAsync: signMainOwner,
    isPending: isSigningMainOwner,
    error: mainOwnerError,
  } = useMainOwnerSignMutation();

  const onSubmit: SubmitHandler<FormSchemaType> = async () => {
    try {
      if (!config.demo.active) {
        if (isOtherOwnerSigning) {
          await signOtherOwner({
            contractSignatureHash: 'e5b7e99313975071e2a2a90f7267ce47', // TODO: Replace with actual hash
            leadSignatureId: signatureId,
          });
        } else {
          await signMainOwner({
            applicationId: leadId,
            contractSignatureHash: 'e5b7e99313975071e2a2a90f7267ce47', // TODO: Replace with actual hash
            leadSignatureId: signatureId,
          });
        }
        if (!otherOwnerError && !mainOwnerError) toNextStep();
        return;
      }

      toNextStep();
    } catch (e) {
      setError(e);
    }
  };

  // Labels
  const title = t('review-payment-and-fees-title');
  const subtitle = t('review-payment-and-fees-subtitle');

  const iAcceptAndAgreeLabel = t('i-accept-and-agree');
  const merchantApplicationLabel = t('common:merchant-application');

  const isSigning = isSigningOtherOwner || isSigningMainOwner;

  return (
    <OnboardingFormWrapper
      form={form}
      onSubmit={handleSubmit(onSubmit)}
      onGoBack={isOtherOwnerSigning ? undefined : toPreviousStep}
      title={title}
      subtitle={subtitle}
      error={error}
      buttonLabel={iAcceptAndAgreeLabel}
      disabled={!agreed || isSigning}
      loading={isSigning}
    >
      <Flex vertical gap={10} className="mb-6 mt-8 max-w-[710px] grow">
        <FeesCard />
        <ButtonAgreementMessage />

        <PdfViewer url={url} title={merchantApplicationLabel} />

        <div className="flex items-start justify-start gap-3">
          <Controller
            control={control}
            name="agreed"
            render={({ field: { value, onChange } }): JSX.Element => (
              <div className="flex items-start justify-start gap-2">
                <Checkbox
                  className="sign-checkbox mt-[14px]"
                  checked={value}
                  onChange={(e): void => {
                    onChange(e.target.checked);
                  }}
                />
                <div className="my-4 space-y-3 text-sm">
                  <ClickToSignParagraph />
                </div>
              </div>
            )}
          />
        </div>
      </Flex>
    </OnboardingFormWrapper>
  );
};

export default ReviewPaymentsAndFeesForm;
