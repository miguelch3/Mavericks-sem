import type { FormStatus } from '@mavericks/types';
import classNames from 'classnames';
import type { OTPInputProps, SlotProps } from 'input-otp';
import { OTPInput as RawOTPInput } from 'input-otp';
import type { FC, LegacyRef } from 'react';
import { forwardRef } from 'react';

type Props = Pick<Partial<OTPInputProps>, 'value' | 'onChange' | 'onBlur'> & {
  name?: string;
  maxLength?: number;
  status?: FormStatus;
  disabled?: boolean;
};

const Slot: FC<SlotProps & { status?: FormStatus; disabled?: boolean }> = ({
  char,
  isActive,
  status,
  disabled,
}) => {
  return (
    <div
      className={classNames(
        'relative w-11 h-11 text-xl',
        'flex items-center justify-center',
        'border border-slate-300 rounded-lg',
        'transition-all duration-75',
        'outline outline-0 outline-accent-foreground/20',
        { 'opacity-50': disabled },
        { 'outline-1 outline-accent-foreground': isActive && !status },
        { 'outline-1 outline-red-500': isActive && status === 'error' },
        { 'outline-1 outline-yellow-500': isActive && status === 'warning' },
        { '!border-red-500': status === 'error' },
        { '!border-yellow-500': status === 'warning' }
      )}
    >
      {char !== null && <div>{char}</div>}
    </div>
  );
};

export const OTPInput = forwardRef<HTMLInputElement, Props>(
  (
    { status, name, maxLength, disabled, ...props },
    ref: LegacyRef<HTMLInputElement>
  ) => {
    return (
      <RawOTPInput
        {...props}
        ref={ref}
        maxLength={maxLength || 4}
        data-cy={`verification-code-input${name ? `-${name}` : ''}`}
        disabled={disabled}
        render={({ slots }): JSX.Element => (
          <div className="flex items-center space-x-2">
            {slots.map((slot, idx) => (
              <Slot key={`slot-${1 + idx}`} {...slot} status={status} />
            ))}
          </div>
        )}
      />
    );
  }
);

OTPInput.displayName = 'OTPInput';
