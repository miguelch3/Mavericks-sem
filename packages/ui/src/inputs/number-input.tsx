import type { FormStatus } from '@mavericks/types';
import type { InputProps, InputRef } from 'antd';
import { Input } from 'antd';
import type { ChangeEvent } from 'react';
import { forwardRef } from 'react';

type Props = InputProps & {
  name: string;
  value?: string;
  placeholder?: string;
  status?: FormStatus;
  onChange?: (value: string) => void;
};

export const NumberInput = forwardRef<InputRef, Props>(
  ({ name, value, onChange, placeholder, status, ...props }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      const formattedValue = newValue.replace(/\D/g, '');
      if (onChange) {
        onChange(formattedValue);
      }
    };

    const formattedValue = value ? value.replace(/\D/g, '') : '';

    return (
      <Input
        ref={ref}
        inputMode="numeric"
        data-cy={name}
        value={formattedValue}
        onChange={handleChange}
        placeholder={placeholder}
        status={status}
        {...props}
      />
    );
  }
);
