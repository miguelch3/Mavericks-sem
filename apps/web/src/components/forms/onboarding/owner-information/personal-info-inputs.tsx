import type { OwnerInformationFields } from '@mavericks/types';
import { FormItem } from '@mavericks/ui';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';
import type { Control, UseFormReturn } from 'react-hook-form';

import { AddressFields } from '@/components/forms/address-fields';

type Props = {
  control: Control<OwnerInformationFields>;
  form: UseFormReturn<OwnerInformationFields>;
  loading?: boolean;
};

export const OwnerPersonalInfoInputs: FC<Props> = ({
  control,
  loading,
  form,
}) => {
  const { t } = useTranslation('registration');

  const dateOfBirthLabel = t('inputs:date-of-birth-label');
  const dateOfBirthPlaceholder = t('inputs:date-of-birth-placeholder');

  const homeAddressLabel = t('inputs:home-address-label');

  const maxDate = dayjs().subtract(18, 'year');

  return (
    <>
      <FormItem control={control} name="dateOfBirth" label={dateOfBirthLabel}>
        <DatePicker
          data-cy="owner-birth-date-input"
          className="w-full"
          placeholder={dateOfBirthPlaceholder}
          format={{ format: 'MM/DD/YYYY' }}
          maxDate={maxDate}
          disabled={loading}
        />
      </FormItem>

      <FormItem control={control} name="homeAddress" label={homeAddressLabel}>
        <AddressFields
          control={control}
          name="owner-home"
          namePrefix="homeAddress"
          disabled={loading}
          form={form}
        />
      </FormItem>
    </>
  );
};
