import type { BusinessBasicInformationFieldsType } from '@mavericks/types';
import {
  MAX_BUSINESS_NAME_LENGTH,
  MIN_BUSINESS_NAME_LENGTH,
} from '@mavericks/types';
import { FieldLabel, FormItem, USPhoneNumberInput } from '@mavericks/ui';
import { Checkbox, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import { AddressFields } from '@/components/forms/address-fields';

type Props = {
  disabled?: boolean;
  form: UseFormReturn<BusinessBasicInformationFieldsType>;
};

export const BusinessOtherFields: FC<Props> = ({ disabled, form }) => {
  const { t } = useTranslation('registration');

  const { control } = form;

  // Labels
  const doingBusinessAsLabel = t('inputs:doing-business-as-label');
  const doingBusinessAsPlaceholder = t('inputs:doing-business-as-placeholder');

  const businessEstablishedDateLabel = t(
    'inputs:business-established-date-label'
  );
  const businessEstablishedDatePlaceholder = t(
    'inputs:business-established-date-placeholder'
  );

  const legalPhoneInputPlaceholder = t('inputs:mobile-phone-placeholder');

  const dbaAddressLabel = t('inputs:dba-address-label');

  const dbaAddressDifferentLabel = t(
    'inputs:dba-address-different-from-legal-address'
  );

  const businessPhoneLabel = t('inputs:business-phone-label');

  const businessPhoneDifferentLabel = t(
    'inputs:business-phone-different-from-legal-phone'
  );

  const dbaAddressIsRequired = useWatch({
    control,
    name: 'dbaAddress.isRequired',
  });
  const businessPhoneIsRequired = useWatch({
    control,
    name: 'businessPhone.isRequired',
  });

  return (
    <>
      <FormItem
        control={control}
        name="dbaName"
        label={doingBusinessAsLabel}
        errorVars={{
          min: MIN_BUSINESS_NAME_LENGTH,
          max: MAX_BUSINESS_NAME_LENGTH,
        }}
      >
        <Input
          data-cy="dba-name-input"
          placeholder={doingBusinessAsPlaceholder}
          disabled={disabled}
        />
      </FormItem>

      <FormItem
        control={control}
        name="businessEstablishedDate"
        label={businessEstablishedDateLabel}
      >
        <DatePicker
          data-cy="business-established-date-input"
          className="w-full"
          placeholder={businessEstablishedDatePlaceholder}
          picker="month"
          format={{ format: 'MM/YYYY' }}
          maxDate={dayjs()}
          minDate={dayjs().set('year', 1920).set('month', 0)}
          disabled={disabled}
        />
      </FormItem>

      <div>
        <FieldLabel label={dbaAddressLabel} className="mb-2" />
        <FormItem control={control} name="dbaAddress.isRequired">
          <Checkbox
            data-cy="dba-address-checkbox"
            className="!mb-2 !text-xs"
            checked={dbaAddressIsRequired}
            disabled={disabled}
          >
            {dbaAddressDifferentLabel}
          </Checkbox>
        </FormItem>

        {dbaAddressIsRequired && (
          <FormItem control={control} name="dbaAddress">
            <AddressFields
              control={control}
              name="dba-address"
              namePrefix="dbaAddress.address"
              disabled={disabled}
              form={form}
            />
          </FormItem>
        )}
      </div>

      <Form.Item label={businessPhoneLabel}>
        <FormItem control={control} name="businessPhone.isRequired">
          <Checkbox
            data-cy="business-phone-checkbox"
            className="!mb-2 !text-xs"
            checked={businessPhoneIsRequired}
            disabled={disabled}
          >
            {businessPhoneDifferentLabel}
          </Checkbox>
        </FormItem>

        {businessPhoneIsRequired && (
          <FormItem control={control} name="businessPhone.phone">
            <USPhoneNumberInput
              name="business-phone-input"
              placeholder={legalPhoneInputPlaceholder}
              disabled={disabled}
            />
          </FormItem>
        )}
      </Form.Item>
    </>
  );
};
