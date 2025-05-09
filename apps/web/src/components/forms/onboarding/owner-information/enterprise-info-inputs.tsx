import type { OwnerIndex, OwnerInformationFields } from '@mavericks/types';
import { MAX_EMAIL_LENGTH } from '@mavericks/types';
import { FormItem } from '@mavericks/ui';
import { Input, InputNumber, Select } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';
import type { Control } from 'react-hook-form';

import { useJobTitles } from '@/api-hooks/onboarding';
import { useOwnersData } from '@/hooks/use-owners-data';

type Props = {
  control: Control<OwnerInformationFields>;
  loading: boolean;
  ownerIndex: OwnerIndex;
};

export const OwnerEnterpriseInfoInputs: FC<Props> = ({
  control,
  loading,
  ownerIndex,
}) => {
  const { t } = useTranslation('registration');

  const { remainingAssignableOwnership } = useOwnersData(ownerIndex);

  const { data: jobTitles, isLoading: jobTitlesLoading } = useJobTitles();

  const jobTitleLabel = t('inputs:job-title-label');
  const jobTitlePlaceholder = t('inputs:job-title-placeholder');

  const ownershipPercentageLabel = t('inputs:ownership-percentage-label');
  const ownershipPercentagePlaceholder = t(
    'inputs:ownership-percentage-placeholder'
  );

  const emailLabel = t('inputs:email-label');
  const emailPlaceholder = t('inputs:email-placeholder');

  return (
    <>
      <FormItem control={control} name="jobTitle" label={jobTitleLabel}>
        <Select
          data-cy="owner-job-title-select"
          className="w-full"
          placeholder={jobTitlePlaceholder}
          options={jobTitles}
          loading={jobTitlesLoading}
          disabled={jobTitlesLoading || loading}
          size="large"
          allowClear
        />
      </FormItem>
      <FormItem
        control={control}
        name="ownershipPercentage"
        label={ownershipPercentageLabel}
        errorVars={{
          min: 1,
          max: 100,
          available: 100 - remainingAssignableOwnership,
        }}
      >
        <InputNumber
          inputMode="numeric"
          data-cy="owner-ownership-percentage-input"
          suffix={ownershipPercentagePlaceholder}
          className="!w-full"
          max={100}
          maxLength={3}
          disabled={loading}
        />
      </FormItem>
      <FormItem
        control={control}
        name="email"
        label={emailLabel}
        errorVars={{
          max: MAX_EMAIL_LENGTH,
        }}
      >
        <Input
          data-cy="owner-email-input"
          type="email"
          placeholder={emailPlaceholder}
          disabled={loading}
        />
      </FormItem>
    </>
  );
};
