import type { FC } from 'react';

type FeeCellProps = {
  percentage: string;
  cents: string;
};

export const FeeCell: FC<FeeCellProps> = ({ percentage, cents }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <p className="text-xl font-medium text-primary md:text-3xl">
        {percentage}%
      </p>
      <p className="text-xs font-medium text-primary md:text-base">+{cents}¢</p>
    </div>
  );
};
