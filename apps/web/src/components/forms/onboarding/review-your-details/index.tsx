import { useSetFeesMutation } from '@mavericks/api-hooks';
import { useRegisterBusinessStore } from '@mavericks/store';
import { FieldLabel } from '@mavericks/ui';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { StepFormComponentType } from '@/common-types/form';
import { BankAccountInfoCard } from '@/components/cards/bank-account-info-card';
import { BusinessOverviewCard } from '@/components/cards/business-overview-card';
import { ManagementOverviewCard } from '@/components/cards/management-overview-card';
import { InputsWrapper } from '@/components/forms/onboarding/inputs-wrapper';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { clientConfig as config } from '@/config/client';

const ReviewDetailsForm: StepFormComponentType = ({
  toNextStep,
  toPreviousStep,
}) => {
  const { t } = useTranslation('registration');
  const form = useForm({
    mode: config.app.form.validationMode,
  });
  const { handleSubmit } = form;

  const [error, setError] = useState<unknown>(null);

  const { mutateAsync: setFees, isPending: setFeesLoading } =
    useSetFeesMutation();

  // TODO: Move to theme store once ready
  const theme = useRegisterBusinessStore();
  const business = useRegisterBusinessStore((s) => s.business);

  const onSubmit: SubmitHandler<object> = async () => {
    // Fees come from config as numeric values to be shown (15c) but in order to send them to the api they should be in cents (0.15)
    const cardFeeAmount = Number(config.data.cardPresentFeeAmount) / 100;
    const nonCardFeeAmount = Number(config.data.nonCardPresentFeeAmount) / 100;

    try {
      setError(null);

      if (!config.demo.active) {
        await setFees({
          cardPercentage: config.data.cardPresentPercentage,
          nonCardPercentage: config.data.nonCardPresentPercentage,
          cardFeeAmount: String(cardFeeAmount),
          nonCardFeeAmount: String(nonCardFeeAmount),
          appFee: config.data.monthlyServiceFee,
        });
      }

      toNextStep();
    } catch (e) {
      setError(e);
    }
  };

  // Labels
  const title = t('review-your-details-title');
  const subtitle = t('review-your-details-subtitle');
  const buttonMessageLabel = t('review-your-details-terms');

  const businessDetailsTitle = t('business-details-title');
  const managementAndOwnershipTitle = t('management-and-ownership-title');
  const bankAccountInformationTitle = t('bank-account-information-title');
  const iConfirmLabel = t('common:i-confirm');

  // Button Message
  const buttonMessage = (
    <p style={{ color: theme.primaryColor }} className="mt-2 text-center">
      {buttonMessageLabel}
    </p>
  );

  return (
    <OnboardingFormWrapper
      form={form}
      onSubmit={handleSubmit(onSubmit)}
      onGoBack={toPreviousStep}
      title={title}
      subtitle={subtitle}
      loading={setFeesLoading}
      error={error}
      buttonLabel={iConfirmLabel}
      buttonMessage={buttonMessage}
    >
      <InputsWrapper>
        <FieldLabel label={businessDetailsTitle} />
        <BusinessOverviewCard
          businessName={business.legalBusinessName}
          businessWebsite={business.mainProduct.website}
          address={business.legalAddress.address}
        />

        <FieldLabel label={managementAndOwnershipTitle} />
        <ManagementOverviewCard owner={business.mainOwner} />

        <FieldLabel label={bankAccountInformationTitle} />
        <BankAccountInfoCard bankAccount={business.bankAccount} />
      </InputsWrapper>
    </OnboardingFormWrapper>
  );
};

export default ReviewDetailsForm;
