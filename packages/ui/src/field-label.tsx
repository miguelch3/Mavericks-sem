import classNames from 'classnames';
import type { FC } from 'react';

type LabelProps = {
  label: string;
  className?: string;
};

export const FieldLabel: FC<LabelProps> = ({ label, className }) => {
  return (
    <div className={classNames('mt-1 text-sm text-primary', className)}>
      {label}
    </div>
  );
};
