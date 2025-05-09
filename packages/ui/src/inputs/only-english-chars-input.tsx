import type { FormStatus } from '@mavericks/types';
import { MAX_NAME_LENGTH } from '@mavericks/types';
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
  maxLength?: number;
  disabled?: boolean;
  status?: FormStatus;
};

export const OnlyEnglishCharsInput = forwardRef<InputRef, Props>(
  (
    {
      name,
      value = '',
      placeholder,
      onChange,
      errorMessage,
      maxLength = MAX_NAME_LENGTH, // Default max length for regular names
      disabled,
      status,
    },
    ref
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      let newValue = e.target.value;

      newValue = newValue.replace(/[^a-zA-Z\s]/g, '');

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
          maxLength={maxLength}
          disabled={disabled}
          status={status}
        />
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
      </>
    );
  }
);
