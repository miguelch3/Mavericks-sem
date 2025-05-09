import type { FC } from 'react';

type RowHeaderProps = {
  title: string;
};

export const RowHeader: FC<RowHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center">
      <p className="text-start text-xs font-medium !leading-4 text-dark-gray md:text-base">
        {title}
      </p>
    </div>
  );
};
