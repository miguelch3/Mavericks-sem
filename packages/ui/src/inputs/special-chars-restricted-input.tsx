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
  errorMessage?: string;
  status?: FormStatus;
};

export const SpecialCharsRestrictedInput = forwardRef<InputRef, Props>(
  ({ name, value = '', placeholder, onChange, errorMessage, status }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;

      // NOTE: this will be uncommented later to activate its usage
      // newValue = newValue;
      // .replace(/'|'|‛/g, "'")
      // .replace(/[^a-zA-Z0-9 '&.,-]/g, '');

      if (onChange) onChange(newValue);
    };

    return (
      <>
        <Input
          ref={ref}
          data-cy={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={100}
          status={status}
        />
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
      </>
    );
  }
);
