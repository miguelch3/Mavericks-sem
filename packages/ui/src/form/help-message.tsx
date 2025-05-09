import type { FC, ReactNode } from 'react';

type HelpMessageProps = {
  help: ReactNode;
};

export const HelpMessage: FC<HelpMessageProps> = ({ help }) => {
  return <div className="mt-1 text-gray-600">{help}</div>;
};
