// This will be disabled as Control doesn't need type validation here
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAddressStatesQuery } from '@mavericks/api-hooks';
import type { Address, GoogleAddressSuggestion } from '@mavericks/types';
import { MAX_CITY_LENGTH, MAX_ZIP_CODE_LENGTH } from '@mavericks/types';
import { AddressAutocomplete, FormItem, ZipCodeInput } from '@mavericks/ui';
import { Flex, Input, Select } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { forwardRef } from 'react';
import type { Control, UseFormReturn } from 'react-hook-form';

type BusinessAddressProps = {
  name: string;
  namePrefix: string;
  disabled?: boolean;
  control: Control<any>;
  form?: UseFormReturn<any>;
  setSuggestedAddress?: (address: GoogleAddressSuggestion) => void;
};

export const AddressFields = forwardRef<HTMLDivElement, BusinessAddressProps>(
  ({ name, namePrefix, disabled, control, form, setSuggestedAddress }, ref) => {
    const { t } = useTranslation('common');
    const { data: stateOptions, isPending } = useGetAddressStatesQuery();

    const handleLegalSuggestedAddress = (
      address: GoogleAddressSuggestion
    ): void => {
      if (!form) return;

      const suggestedAddress: Address = {
        ...address,
        addressOne: address.address,
      };

      form.setValue(`${namePrefix}`, suggestedAddress);
      form.setValue(`${namePrefix}.addressOne`, address.address);
      form.setValue(`${namePrefix}.addressTwo`, '');
      form.setValue(`${namePrefix}.city`, address.city);
      form.setValue(`${namePrefix}.state`, address.state);
      form.setValue(`${namePrefix}.zip`, address.zip);

      form.trigger(namePrefix).catch(() => {});
    };

    // Labels
    const addressOneLabel = t('address-line-1');
    const addressTwoLabel = t('address-line-2');
    const cityLabel = t('city');
    const stateLabel = t('state');
    const zipLabel = t('zip');

    return (
      <Flex ref={ref} vertical gap={10}>
        <FormItem name={`${namePrefix}.addressOne`} control={control}>
          <AddressAutocomplete
            name={`${name ?? namePrefix}-main-address`}
            disabled={disabled}
            placeholder={addressOneLabel}
            setAddress={setSuggestedAddress || handleLegalSuggestedAddress}
            className="w-full"
          />
        </FormItem>
        <FormItem name={`${namePrefix}.addressTwo`} control={control}>
          <Input
            data-cy={`${name ?? namePrefix}-second-address`}
            placeholder={addressTwoLabel}
            disabled={disabled}
          />
        </FormItem>
        <FormItem
          name={`${namePrefix}.city`}
          control={control}
          errorVars={{
            max: MAX_CITY_LENGTH,
          }}
        >
          <Input
            data-cy={`${name ?? namePrefix}-city`}
            placeholder={cityLabel}
            disabled={disabled}
          />
        </FormItem>
        <FormItem name={`${namePrefix}.state`} control={control}>
          <Select
            data-cy={`${name ?? namePrefix}-state-select`}
            className="w-full"
            size="large"
            loading={isPending}
            disabled={disabled || isPending}
            placeholder={stateLabel}
            showSearch
            allowClear
          >
            {stateOptions?.map((op) => (
              <Select.Option key={`${op.value}-option`} value={op.value}>
                {op.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          name={`${namePrefix}.zip`}
          control={control}
          errorVars={{
            min: MAX_ZIP_CODE_LENGTH,
          }}
        >
          <ZipCodeInput
            name={`${name ?? namePrefix}-zip`}
            placeholder={zipLabel}
            disabled={disabled}
          />
        </FormItem>
      </Flex>
    );
  }
);
