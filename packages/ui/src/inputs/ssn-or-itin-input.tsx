import { formatSSNOrITIN } from '@mavericks/shared';
import type { FormStatus } from '@mavericks/types';
import type { InputRef } from 'antd';
import { Input } from 'antd';
import type { ChangeEvent } from 'react';
import { forwardRef } from 'react';

type Props = {
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  status?: FormStatus;
};

export const SSNOrITINInput = forwardRef<InputRef, Props>(
  ({ name, value, onChange, placeholder, disabled, status }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      const formattedValue = formatSSNOrITIN(newValue);
      if (onChange) {
        onChange(formattedValue);
      }
    };

    const formattedValue = formatSSNOrITIN(value || '');

    return (
      <Input
        ref={ref}
        inputMode="numeric"
        data-cy={name}
        value={formattedValue}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={11}
        disabled={disabled}
        status={status}
      />
    );
  }
);
