import type { BusinessBasicInformationFieldsType } from '@mavericks/types';
import { TINOption } from '@mavericks/types';
import { EINInput, FormItem, SSNOrITINInput } from '@mavericks/ui';
import { Select } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';
import { useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  disabled?: boolean;
  loading?: boolean;
  form: UseFormReturn<BusinessBasicInformationFieldsType>;
};

type TINFieldLabels = {
  label: string;
  requiredError: string;
  placeholder: string;
};

export const TINInputs: FC<Props> = ({ disabled, loading, form }) => {
  const { t } = useTranslation('registration');

  const { control, watch } = form;

  const selectedTIN = watch('tinData.selectedTin');

  const tinTypeLabel = t('inputs:tin-type-label');
  const tinTypePlaceholder = t('inputs:tin-type-placeholder');

  const einLabel = t('inputs:ein-label');
  const einPlaceholder = t('inputs:ein-placeholder');
  const einRequiredMessage = t('inputs:ein-required-message');

  const ssnLabel = t('inputs:ssn-label');
  const ssnPlaceholder = t('inputs:ssn-placeholder');
  const ssnRequiredMessage = t('inputs:ssn-required-message');

  const itinLabel = t('inputs:itin-label');
  const itinPlaceholder = t('inputs:itin-placeholder');
  const itinRequiredMessage = t('inputs:itin-required-message');

  const tinLabelsMap: Record<TINOption, TINFieldLabels> = useMemo(
    () => ({
      EIN: {
        label: einLabel,
        placeholder: einPlaceholder,
        requiredError: einRequiredMessage,
      },
      SSN: {
        label: ssnLabel,
        placeholder: ssnPlaceholder,
        requiredError: ssnRequiredMessage,
      },
      ITIN: {
        label: itinLabel,
        placeholder: itinPlaceholder,
        requiredError: itinRequiredMessage,
      },
    }),
    [
      einLabel,
      einPlaceholder,
      einRequiredMessage,
      itinLabel,
      itinPlaceholder,
      itinRequiredMessage,
      ssnLabel,
      ssnPlaceholder,
      ssnRequiredMessage,
    ]
  );

  const tinLabels = useMemo(() => {
    const tinOptions = Object.values(TINOption);
    if (selectedTIN && tinOptions.includes(selectedTIN)) {
      return tinLabelsMap[selectedTIN];
    }

    return tinLabelsMap.EIN;
  }, [selectedTIN, tinLabelsMap]);

  const inputsDisabled = disabled || loading;

  return (
    <>
      <FormItem
        control={control}
        name="tinData.selectedTin"
        data-cy="tin-select-wrapper"
        label={tinTypeLabel}
      >
        <Select
          data-cy="business-tin-type-select"
          className="w-full"
          size="large"
          placeholder={tinTypePlaceholder}
          allowClear
          disabled={inputsDisabled}
        >
          {Object.values(TINOption).map((tin) => (
            <Select.Option key={tin}>{tin}</Select.Option>
          ))}
        </Select>
      </FormItem>

      {!!selectedTIN && (
        <FormItem control={control} name="tinData.tin" label={tinLabels.label}>
          {selectedTIN === TINOption.EIN ? (
            <EINInput
              name="ein-input"
              placeholder={tinLabels.placeholder}
              disabled={inputsDisabled}
            />
          ) : (
            <SSNOrITINInput
              name="ssn-or-itin-input"
              placeholder={tinLabels.placeholder}
              disabled={inputsDisabled}
            />
          )}
        </FormItem>
      )}
    </>
  );
};
