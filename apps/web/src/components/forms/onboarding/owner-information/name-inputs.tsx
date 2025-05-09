import type { OwnerInformationFields } from '@mavericks/types';
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from '@mavericks/types';
import { FormItem, OnlyEnglishCharsInput } from '@mavericks/ui';
import { Flex } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';
import type { Control } from 'react-hook-form';

type Props = {
  control: Control<OwnerInformationFields>;
  loading?: boolean;
  help?: string;
};

export const OwnerNameInputs: FC<Props> = ({ control, loading, help }) => {
  const { t } = useTranslation('registration');

  const firstNameLabel = t('inputs:first-name-label');
  const firstNamePlaceholder = t('inputs:first-name-placeholder');

  const middleNameLabel = t('inputs:middle-name-label');
  const middleNamePlaceholder = t('inputs:middle-name-placeholder');

  const lastNameLabel = t('inputs:last-name-label');
  const lastNamePlaceholder = t('inputs:last-name-placeholder');

  return (
    <>
      <Flex gap={15}>
        <FormItem
          control={control}
          name="name.firstName"
          label={firstNameLabel}
          errorVars={{
            min: MIN_NAME_LENGTH,
            max: MAX_NAME_LENGTH,
          }}
        >
          <OnlyEnglishCharsInput
            name="owner-first-name-input"
            placeholder={firstNamePlaceholder}
            maxLength={MAX_NAME_LENGTH}
            disabled={loading}
          />
        </FormItem>

        <FormItem
          control={control}
          name="name.lastName"
          label={lastNameLabel}
          errorVars={{
            min: MIN_NAME_LENGTH,
            max: MAX_NAME_LENGTH,
          }}
        >
          <OnlyEnglishCharsInput
            name="owner-last-name-input"
            placeholder={lastNamePlaceholder}
            maxLength={MAX_NAME_LENGTH}
            disabled={loading}
          />
        </FormItem>
      </Flex>

      <div className="mt-2">
        <FormItem
          control={control}
          name="name.middleName"
          label={middleNameLabel}
          help={help}
          errorVars={{
            max: MAX_NAME_LENGTH,
          }}
        >
          <OnlyEnglishCharsInput
            name="owner-middle-name-input"
            placeholder={middleNamePlaceholder}
            maxLength={MAX_NAME_LENGTH}
            disabled={loading}
          />
        </FormItem>
      </div>
    </>
  );
};
