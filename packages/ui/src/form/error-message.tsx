import type { FC } from 'react';

type ErrorMessageProps = {
  error: string;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  return <p className="text-red-500 text-sm mt-1">{error}</p>;
};
