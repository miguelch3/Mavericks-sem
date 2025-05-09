import type { FormStatus, GoogleAddressSuggestion } from '@mavericks/types';
import { AutoComplete } from 'antd';
import classNames from 'classnames';
import type { BaseSelectRef } from 'rc-select';
import { forwardRef, useMemo } from 'react';
import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete';

type Props = {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  setAddress: (address: GoogleAddressSuggestion) => void;
  placeholder?: string;
  status?: FormStatus;
  className?: string;
};

type AutocompleteOption = {
  label: string;
  value: string;
  googleValue: string;
};

const extractAddressComponents = (
  addressComponents: google.maps.GeocoderAddressComponent[]
): GoogleAddressSuggestion => {
  const components: GoogleAddressSuggestion = {
    address: '',
    city: '',
    state: '',
    zip: '',
  };

  addressComponents.forEach((component) => {
    const { types } = component;
    if (types.includes('street_number')) {
      components.address = `${component.long_name} ${components.address ?? ''}`;
    } else if (types.includes('route')) {
      components.address += component.long_name;
    } else if (types.includes('locality')) {
      components.city = component.long_name;
    } else if (types.includes('administrative_area_level_1')) {
      components.state = component.long_name;
    } else if (types.includes('postal_code')) {
      components.zip = component.long_name;
    }
  });

  return components;
};

export const AddressAutocomplete = forwardRef<BaseSelectRef, Props>(
  (
    {
      name,
      value,
      onChange,
      disabled,
      setAddress,
      placeholder,
      status,
      className,
    },
    ref
  ) => {
    const {
      ready,
      setValue,
      suggestions: { data },
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: { componentRestrictions: { country: 'us' } },
    });

    const options = useMemo<AutocompleteOption[]>(
      () =>
        data.map((row) => ({
          label: row.description,
          value: row.description,
          googleValue: row.place_id,
        })),
      [data]
    );

    const handleChange = (newValue: string): void => {
      setValue(newValue);
      if (onChange) onChange(newValue);
    };

    const handleAddressSelection = async ({
      googleValue,
    }: AutocompleteOption): Promise<void> => {
      // Extract address details
      const rawAddress = await getDetails({ placeId: googleValue });
      if (typeof rawAddress === 'string') return;

      const addressDetails = extractAddressComponents(
        rawAddress.address_components ?? []
      );

      // Hook state
      setValue(addressDetails.address);
      clearSuggestions();

      // Address
      setAddress(addressDetails);
    };

    return (
      <AutoComplete
        ref={ref}
        id="address-autocomplete"
        data-cy={name}
        value={value}
        options={options}
        onChange={handleChange}
        disabled={!ready || disabled}
        onSelect={(_, option): Promise<void> => handleAddressSelection(option)}
        placeholder={placeholder}
        className={classNames('address-autocomplete', className)}
        status={status}
      />
    );
  }
);
