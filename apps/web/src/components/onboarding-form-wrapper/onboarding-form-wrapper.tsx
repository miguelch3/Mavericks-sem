import { useSessionStore } from '@mavericks/store';
import { FormsWithProgressBar } from '@mavericks/types';
import { Form } from 'antd';
import classNames from 'classnames';
import type { BaseSyntheticEvent, PropsWithChildren, ReactNode } from 'react';
import { useMemo } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

import { BackNavigationButton } from './back-navigation-button';
import { OnboardingFormTitle } from './onboarding-form-title';
import { OnboardingProgressBar } from './onboarding-progress-bar';
import { SubmitButton } from './submit-button';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  title: string;
  subtitle: string | ReactNode;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  onGoBack?: () => void;

  loading?: boolean;
  disabled?: boolean;
  hideButton?: boolean;
  buttonLabel?: string;
  buttonAtEnd?: boolean;
  customHelp?: ReactNode;

  error?: unknown;
  titleClassName?: string;
  buttonMessage?: ReactNode;
};

export const OnboardingFormWrapper = <T extends object>({
  onSubmit,
  onGoBack,
  title,
  subtitle,
  titleClassName,
  loading,

  hideButton,
  disabled,
  error,
  customHelp,
  buttonLabel,
  buttonAtEnd,

  buttonMessage,
  form,

  children,
}: PropsWithChildren<Props<T>>): JSX.Element => {
  const sessionStore = useSessionStore();

  const showProgress = useMemo(
    () => FormsWithProgressBar.includes(sessionStore.step),
    [sessionStore.step]
  );

  const disableSubmit = !form.formState.isValid && !form.formState.isDirty;

  return (
    <div className="flex size-full max-h-full flex-col overflow-auto px-4 py-0 lg:items-start lg:px-14 lg:py-10">
      <div>
        {onGoBack && (
          <BackNavigationButton onGoBack={onGoBack} loading={loading} />
        )}

        {showProgress && <OnboardingProgressBar />}
      </div>

      <OnboardingFormTitle
        title={title}
        subtitle={subtitle}
        className={titleClassName}
        hasGoBack={!!onGoBack}
        showProgress={showProgress}
      />

      {/* Form */}
      <div
        className={classNames({
          'h-full flex flex-col justify-between': buttonAtEnd,
        })}
      >
        <Form onFinish={onSubmit} layout="vertical" disabled={loading}>
          {children}

          <SubmitButton
            hide={hideButton}
            loading={loading}
            disabled={disabled || disableSubmit}
            error={error}
            help={customHelp}
            buttonMessage={buttonMessage}
            text={buttonLabel}
          />
        </Form>
      </div>
    </div>
  );
};
