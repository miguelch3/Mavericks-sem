import { formatCurrency } from '@mavericks/shared';
import type { FormStatus } from '@mavericks/types';
import type { InputRef } from 'antd';
import { Input } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { ChangeEvent } from 'react';
import { forwardRef } from 'react';

type Props = {
  name: string;
  value?: string;
  className?: string;
  status?: FormStatus;
  onChange?: (value: number | null) => void;
};

export const CurrencyInput = forwardRef<InputRef, Props>(
  ({ name, value, className, onChange, status }, ref) => {
    const { t } = useTranslation('registration');

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      const parsedValue = newValue?.replace(/\$\s?|(,*)/g, '') ?? '0';
      const numericValue = parsedValue ? Number(parsedValue) : null;

      if (onChange) {
        onChange(numericValue);
      }
    };

    const moneyPlaceholder = t('inputs:money-placeholder');

    const formattedValue = formatCurrency(String(value) ?? '');

    return (
      <Input
        ref={ref}
        inputMode="numeric"
        data-cy={name}
        className={className}
        value={formattedValue}
        onChange={handleChange}
        prefix={moneyPlaceholder}
        status={status}
      />
    );
  }
);
