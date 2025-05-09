import { formatZipCode } from '@mavericks/shared';
import type { FormStatus } from '@mavericks/types';
import { MAX_ZIP_CODE_LENGTH } from '@mavericks/types';
import type { InputRef } from 'antd';
import { Input } from 'antd';
import type { ChangeEvent } from 'react';
import { forwardRef } from 'react';

type Props = {
  name: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  status?: FormStatus;
};

export const ZipCodeInput = forwardRef<InputRef, Props>(
  ({ name, value, placeholder, disabled, onChange, status }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      const formattedValue = formatZipCode(newValue);
      if (onChange) {
        onChange(formattedValue);
      }
    };

    const formattedValue = formatZipCode(value || '');

    return (
      <Input
        ref={ref}
        inputMode="numeric"
        data-cy={name}
        value={formattedValue}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={MAX_ZIP_CODE_LENGTH}
        disabled={disabled}
        status={status}
      />
    );
  }
);
