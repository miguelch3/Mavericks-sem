import type { OwnerInformationFields } from '@mavericks/types';
import { MIN_PHONE_LENGTH_WITH_CHARS } from '@mavericks/types';
import { FormItem, SSNOrITINInput, USPhoneNumberInput } from '@mavericks/ui';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';
import type { Control } from 'react-hook-form';

type Props = {
  loading?: boolean;
  control: Control<OwnerInformationFields>;
};

export const OwnerOtherFieldsInputs: FC<Props> = ({ control, loading }) => {
  const { t } = useTranslation('registration');

  const yourSsnNumberLabel = t('inputs:your-ssn-number-label');
  const yourSsnNumberPlaceholder = t('inputs:your-ssn-number-placeholder');
  const yourSsnNumberHelp = t('inputs:your-ssn-number-help');

  const contactPhoneLabel = t('inputs:contact-phone-label');
  const contactPhonePlaceholder = t('inputs:mobile-phone-placeholder');

  return (
    <>
      <FormItem
        control={control}
        name="ssn"
        label={yourSsnNumberLabel}
        help={yourSsnNumberHelp}
      >
        <SSNOrITINInput
          name="owner-ssn-input"
          placeholder={yourSsnNumberPlaceholder}
          disabled={loading}
        />
      </FormItem>
      <FormItem
        control={control}
        name="contactPhone"
        label={contactPhoneLabel}
        errorVars={{
          min: MIN_PHONE_LENGTH_WITH_CHARS,
        }}
      >
        <USPhoneNumberInput
          name="owner-contact-phone-input"
          placeholder={contactPhonePlaceholder}
          disabled={loading}
        />
      </FormItem>
    </>
  );
};
