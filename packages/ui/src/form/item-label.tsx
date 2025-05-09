import type { FC } from 'react';

type LabelProps = {
  label: string;
};

export const FormItemLabel: FC<LabelProps> = ({ label }) => {
  return <p className="text-primary mb-2">{label}</p>;
};
