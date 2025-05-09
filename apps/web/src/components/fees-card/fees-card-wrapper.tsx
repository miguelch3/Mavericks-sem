import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

export const FeesCardWrapper: FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        'flex w-full flex-row justify-around rounded-lg border-4 border-gray-100 px-6 py-3',
        className
      )}
    >
      {children}
    </div>
  );
};
