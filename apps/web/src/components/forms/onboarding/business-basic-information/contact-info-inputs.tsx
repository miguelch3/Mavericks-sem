import { useRegisterBusinessStore } from '@mavericks/store';
import type { BusinessBasicInformationFieldsType } from '@mavericks/types';
import { MAX_EMAIL_LENGTH, MAX_NAME_LENGTH } from '@mavericks/types';
import { FormItem } from '@mavericks/ui';
import { Input } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';
import type { Control } from 'react-hook-form';

type Props = {
  disabled?: boolean;
  control: Control<BusinessBasicInformationFieldsType>;
};

export const ContactInfoInputs: FC<Props> = ({ control, disabled }) => {
  const { t } = useTranslation('registration');

  // TODO: Change with theme store when implemented
  const theme = useRegisterBusinessStore();

  // Labels
  const mainContactPersonLabel = t('inputs:main-contact-person');
  const mainContactPersonHelp = t('inputs:main-contact-person-help');

  const contactNameLabel = t('inputs:contact-name-label');
  const contactNamePlaceHolder = t('inputs:contact-name-placeholder');

  const contactEmailAddressLabel = t('inputs:contact-email-label');
  const contactEmailAddressPlaceHolder = t('inputs:contact-email-placeholder');

  return (
    <>
      <div>
        <p style={{ color: theme.primaryColor }} title={mainContactPersonLabel}>
          {mainContactPersonLabel}
        </p>
        <p className="text-sm">{mainContactPersonHelp}</p>
      </div>
      <FormItem
        control={control}
        name="contactName"
        label={contactNameLabel}
        errorVars={{
          max: MAX_NAME_LENGTH,
        }}
      >
        <Input
          data-cy="contact-name-input"
          placeholder={contactNamePlaceHolder}
          disabled={disabled}
        />
      </FormItem>

      <FormItem
        control={control}
        name="contactEmail"
        label={contactEmailAddressLabel}
        errorVars={{
          max: MAX_EMAIL_LENGTH,
        }}
      >
        <Input
          data-cy="contact-email-input"
          placeholder={contactEmailAddressPlaceHolder}
          disabled={disabled}
        />
      </FormItem>
    </>
  );
};
