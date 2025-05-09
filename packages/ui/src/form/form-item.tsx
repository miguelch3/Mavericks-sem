import type { FormStatus } from '@mavericks/types';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller, useController } from 'react-hook-form';

import { ErrorMessage } from './error-message';
import { HelpMessage } from './help-message';
import { FormItemLabel } from './item-label';

type AbstractItemProps = {
  onChange?: (...params: unknown[]) => unknown;
  onBlur?: (...params: unknown[]) => unknown;
  disabled?: boolean;
  status?: FormStatus;
};

export type FormItemProps<TFieldValues extends FieldValues = FieldValues> = {
  children: React.ReactElement<AbstractItemProps>;
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  disabled?: boolean;

  // Custom
  label?: string;
  help?: string | React.ReactNode;
  className?: string;
  errorVars?: Record<string, string | number>;
};

export const FormItem = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  help,
  children,
  disabled,
  className,
  errorVars = {},
}: FormItemProps<TFieldValues>): JSX.Element => {
  const { t } = useTranslation();
  const {
    fieldState: { error },
  } = useController<TFieldValues>({ name, control });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }): JSX.Element => (
        <div className={className}>
          {label && <FormItemLabel label={label} />}

          {React.isValidElement(children) &&
            React.cloneElement(children, {
              ...field,

              onChange: (...params: unknown[]) => {
                children.props?.onChange?.(...params);
                field.onChange(...params);
              },
              onBlur: () => {
                children.props.onBlur?.();
                field.onBlur();
              },
              disabled,
              status: error ? 'error' : undefined,
            })}

          {error?.message && (
            <ErrorMessage error={t(error.message, errorVars)} />
          )}
          {help && <HelpMessage help={help} />}
        </div>
      )}
    />
  );
};
