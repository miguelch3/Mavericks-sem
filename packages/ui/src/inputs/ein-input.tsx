import { formatEIN } from '@mavericks/shared';
import type { FormStatus } from '@mavericks/types';
import type { InputRef } from 'antd';
import { Input } from 'antd';
import type { ChangeEvent } from 'react';
import { forwardRef } from 'react';

type Props = {
  name: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  status?: FormStatus;
  onChange?: (value: string) => void;
};

export const EINInput = forwardRef<InputRef, Props>(
  ({ name, value, placeholder, onChange, disabled, status }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      const formattedValue = formatEIN(newValue);
      if (onChange) {
        onChange(formattedValue);
      }
    };

    const formattedValue = formatEIN(value || '');

    return (
      <Input
        ref={ref}
        inputMode="numeric"
        data-cy={name}
        value={formattedValue}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={10}
        disabled={disabled}
        status={status}
      />
    );
  }
);
