import { useSessionStore } from '@mavericks/store';
import { BubbleStep } from '@mavericks/ui';
import { Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { StepFormComponentType } from '@/common-types/form';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { clientConfig as config } from '@/config/client';

export const YouAreAllSetScreen: StepFormComponentType = () => {
  const { t } = useTranslation('registration');
  const form = useForm({
    mode: config.app.form.validationMode,
  });
  const { handleSubmit } = form;

  const sessionStore = useSessionStore();

  const youAreAllSetTitle = t('you-are-all-set-title');
  const choosePaymentSolutionLabel = t('choose-payment-solution-label');
  const hereIsWhatIsNext = t('here-is-what-happens-next');

  const allSetStep1 = t('all-set-step-1');
  const allSetStep2 = t('all-set-step-2');
  const allSetStep3 = t('all-set-step-3');

  const allSetMessage1 = t('all-set-message-1');
  const allSetMessage2 = t('all-set-message-2');
  const allSetMessage3 = t('all-set-message-3');

  useEffect(() => {
    sessionStore.clearCookies();
  }, [sessionStore]);

  return (
    <OnboardingFormWrapper
      form={form}
      onSubmit={handleSubmit((): void => {})}
      title={youAreAllSetTitle}
      titleClassName="title-grey !px-0 mb-2"
      buttonLabel={choosePaymentSolutionLabel}
      hideButton
      subtitle=""
    >
      <div className="max-w-[710px]">
        <Typography.Title level={4} type="secondary" className="!font-normal">
          {hereIsWhatIsNext}
        </Typography.Title>

        <div className="my-10 space-y-3">
          <BubbleStep step={1} text={allSetStep1} />
          <BubbleStep step={2} text={allSetStep2} />
          <BubbleStep step={3} text={allSetStep3} />
        </div>

        <p className="font-medium">
          {allSetMessage1}{' '}
          <span className="text-primary">{config.contact.phone}</span>{' '}
          {allSetMessage2}{' '}
          <span className="text-primary">{config.contact.email}</span>{' '}
          {allSetMessage3}
        </p>
      </div>
    </OnboardingFormWrapper>
  );
};

export default YouAreAllSetScreen;
