import type { FC } from 'react';

export type HardwareItemProps = {
  title: string;
  description: string;
  qty: number;
  price: string;
  priceLabel: string;
};

export const HardwareItem: FC<HardwareItemProps> = ({
  title,
  description,
  qty,
  price,
  priceLabel,
}) => (
  <div className="contents">
    <div className="col-span-6">
      <p className="font-medium text-primary">{title}</p>
      <p className="text-sm font-medium text-dark-gray">{description}</p>
    </div>
    <p className="col-span-1 text-center text-primary">{qty}</p>
    <div className="col-span-1 text-right">
      <p className="font-medium text-primary">{price}</p>
      {priceLabel && (
        <p className="text-xs font-medium text-primary">{priceLabel}</p>
      )}
    </div>
  </div>
);
