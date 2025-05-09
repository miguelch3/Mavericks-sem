import type { FC } from 'react';

export type FeeItemProps = {
  title: string;
  description: string;
  price: string;
  priceLabel?: string;
};

export const FeeItem: FC<FeeItemProps> = ({
  title,
  description,
  price,
  priceLabel,
}) => (
  <div className="mb-4 flex items-center justify-between">
    <div>
      <p className="font-medium text-primary">{title}</p>
      <p className="text-sm font-medium text-dark-gray">{description}</p>
    </div>
    <div className="text-right">
      <p className="text-base font-medium text-primary">{price}</p>
      {priceLabel && (
        <p className="text-xs font-medium text-primary">{priceLabel}</p>
      )}
    </div>
  </div>
);
