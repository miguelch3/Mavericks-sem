import type { FC, PropsWithChildren } from 'react';

export const FullPageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="h-screen w-screen">{children}</div>;
};
