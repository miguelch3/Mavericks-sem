import type { FC } from 'react';

type ColumnHeaderProps = {
  title: string;
};

export const ColumnHeader: FC<ColumnHeaderProps> = ({ title }) => {
  return (
    <p className="text-center text-xs font-medium !leading-4 text-dark-gray md:text-base">
      {title}
    </p>
  );
};
