import { zodResolver } from '@hookform/resolvers/zod';
import { useSetBankAccountMutation } from '@mavericks/api-hooks';
import { useRegisterBusinessStore } from '@mavericks/store';
import type { BankInformationFields } from '@mavericks/types';
import { BankInformationSchema } from '@mavericks/types';
import { FormItem, NumberInput } from '@mavericks/ui';
import { Input, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { ClipboardEventHandler } from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { StepFormComponentType } from '@/common-types/form';
import { InputsWrapper } from '@/components/forms/onboarding/inputs-wrapper';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { clientConfig as config } from '@/config/client';

const AddBankAccount: StepFormComponentType = ({
  toNextStep,
  toPreviousStep,
}) => {
  const { t } = useTranslation('registration');

  const addInformation = useRegisterBusinessStore((s) => s.addInformation);
  const bankAccount = useRegisterBusinessStore((s) => s.business.bankAccount);
  const primaryColor = useRegisterBusinessStore((s) => s.primaryColor);

  const form = useForm<BankInformationFields>({
    mode: config.app.form.validationMode,
    resolver: zodResolver(BankInformationSchema),
    defaultValues: {
      ...bankAccount,
    },
  });
  const { handleSubmit, control } = form;

  const [error, setError] = useState<unknown>(null);

  const { mutateAsync: setBankAccount, isPending } =
    useSetBankAccountMutation();

  const onSubmit: SubmitHandler<BankInformationFields> = async (data) => {
    try {
      if (!config.demo.active) {
        await setBankAccount(data);
      }

      addInformation({ bankAccount: data });
      toNextStep();
    } catch (e) {
      setError(e);
    }
  };

  const handleDisableCopyPaste: ClipboardEventHandler<HTMLInputElement> = (e) =>
    e.preventDefault();

  // Labels
  const title = t('add-bank-account-title');
  const subtitle = t('add-bank-account-subtitle');
  const subtitleTerms = t('add-bank-account-subtitle-terms');

  const bankNameLabel = t('inputs:bank-name-label');

  const bankRoutingNumberLabel = t('inputs:bank-routing-number-label');
  const bankRoutingNumberPlaceholder = t(
    'inputs:bank-routing-number-placeholder'
  );

  const bankAccountNumberLabel = t('inputs:bank-account-number-label');
  const bankAccountNumberPlaceholder = t(
    'inputs:bank-account-number-placeholder'
  );

  const reEnterBankAccountNumberLabel = t(
    'inputs:re-enter-bank-account-number-label'
  );

  const accountHolderNameLabel = t('inputs:account-holder-name-label');
  const accountHolderNamePlaceholder = t(
    'inputs:account-holder-name-placeholder'
  );

  const iAgreeLabel = t('common:i-agree');

  // const uploadVoidedCheckLabel = t('inputs:upload-voided-check-label');

  // const clickOrDragToUploadLabel = t('inputs:click-or-drag-to-upload');

  const subtitleComponent = (
    <p>
      {subtitle}{' '}
      <Typography.Link
        className="!text-sm !underline"
        href={config.links.terms}
        target="_blank"
        style={{ color: primaryColor }}
      >
        {subtitleTerms}
      </Typography.Link>
    </p>
  );

  return (
    <OnboardingFormWrapper<BankInformationFields>
      form={form}
      onSubmit={handleSubmit(onSubmit)}
      onGoBack={toPreviousStep}
      title={title}
      subtitle={subtitleComponent}
      loading={isPending}
      error={error}
      buttonLabel={iAgreeLabel}
    >
      <InputsWrapper gap={15}>
        <FormItem name="bankName" label={bankNameLabel} control={control}>
          <Input data-cy="bank-name-input" placeholder={bankNameLabel} />
        </FormItem>

        <FormItem
          name="routingNumber"
          label={bankRoutingNumberLabel}
          control={control}
        >
          <NumberInput
            name="routing-number-input"
            placeholder={bankRoutingNumberPlaceholder}
            minLength={9}
            maxLength={9}
          />
        </FormItem>

        <FormItem
          name="accountNumber.number"
          label={bankAccountNumberLabel}
          control={control}
        >
          <NumberInput
            name="account-number-input"
            placeholder={bankAccountNumberPlaceholder}
          />
        </FormItem>

        <FormItem
          control={control}
          name="accountNumber.confirm"
          label={reEnterBankAccountNumberLabel}
        >
          <NumberInput
            name="account-number-confirm-input"
            autoComplete="off"
            placeholder={bankAccountNumberPlaceholder}
            onCut={handleDisableCopyPaste}
            onCopy={handleDisableCopyPaste}
            onPaste={handleDisableCopyPaste}
          />
        </FormItem>

        <FormItem
          name="accountHolderName"
          label={accountHolderNameLabel}
          control={control}
        >
          <Input
            data-cy="account-holder-input"
            placeholder={accountHolderNamePlaceholder}
          />
        </FormItem>
        {/* We hide this for v1 version */}
        {/* <Form.Item<BankAccount> label={uploadVoidedCheckLabel}>
          <Dragger name="file">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="text-sm">{clickOrDragToUploadLabel}</p>
          </Dragger>
        </Form.Item> */}
      </InputsWrapper>
    </OnboardingFormWrapper>
  );
};

export default AddBankAccount;
