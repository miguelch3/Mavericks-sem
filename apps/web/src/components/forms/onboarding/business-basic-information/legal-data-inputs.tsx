import type { BusinessBasicInformationFieldsType } from '@mavericks/types';
import {
  MAX_BUSINESS_NAME_LENGTH,
  MIN_BUSINESS_NAME_LENGTH,
  MIN_PHONE_LENGTH_WITH_CHARS,
} from '@mavericks/types';
import { FormItem, USPhoneNumberInput } from '@mavericks/ui';
import { Input } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { AddressFields } from '@/components/forms/address-fields';

type Props = {
  form: UseFormReturn<BusinessBasicInformationFieldsType>;
  disabled?: boolean;
};

export const BusinessLegalDataInputs: FC<Props> = ({ form, disabled }) => {
  const { t } = useTranslation('registration');

  const legalBusinessNameLabel = t('inputs:legal-business-name-label');
  const legalBusinessNameHelp = t('inputs:legal-business-name-help');
  const legalBusinessNamePlaceholder = t(
    'inputs:legal-business-name-placeholder'
  );

  const businessAddressLabel = t('inputs:business-address-label');

  const legalPhoneInputLabel = t('inputs:legal-phone-label');
  const legalPhoneInputPlaceholder = t('inputs:mobile-phone-placeholder');

  const { control } = form;

  return (
    <>
      <FormItem
        control={control}
        name="legalBusinessName"
        label={legalBusinessNameLabel}
        help={legalBusinessNameHelp}
        className="!mb-0"
        errorVars={{
          min: MIN_BUSINESS_NAME_LENGTH,
          max: MAX_BUSINESS_NAME_LENGTH,
        }}
      >
        <Input
          data-cy="legal-name-input"
          placeholder={legalBusinessNamePlaceholder}
          disabled={disabled}
        />
      </FormItem>

      <FormItem
        control={control}
        name="legalAddress"
        label={businessAddressLabel}
      >
        <AddressFields
          control={control}
          name="legal-address"
          namePrefix="legalAddress.address"
          disabled={disabled}
          form={form}
        />
      </FormItem>

      <FormItem
        control={control}
        name="legalPhone"
        label={legalPhoneInputLabel}
        errorVars={{
          min: MIN_PHONE_LENGTH_WITH_CHARS,
        }}
      >
        <USPhoneNumberInput
          name="legal-phone-input"
          placeholder={legalPhoneInputPlaceholder}
          disabled={disabled}
        />
      </FormItem>
    </>
  );
};
