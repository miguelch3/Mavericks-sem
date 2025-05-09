import { formatUSPhoneNumber } from '@mavericks/shared';
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

export const USPhoneNumberInput = forwardRef<InputRef, Props>(
  ({ name, value, placeholder, onChange, disabled, status }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      if (onChange) {
        onChange(newValue.replace(/\D/g, '')); // Just numeric values
      }
    };

    const formattedValue = formatUSPhoneNumber(value || '');

    return (
      <Input
        ref={ref}
        inputMode="numeric"
        data-cy={name}
        value={formattedValue}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={16}
        disabled={disabled}
        status={status}
      />
    );
  }
);
