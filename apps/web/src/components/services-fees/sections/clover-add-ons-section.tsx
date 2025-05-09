import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { HardwareItem } from '@/components/services-fees/common/hardware-item';
import { SectionHeader } from '@/components/services-fees/common/section-header';

type CloverAddOnsItemProps = {
  id: string;
  title: string;
  description: string;
  qty: number;
  price: string;
  priceLabel: string;
};

type CloverAddOnsSectionProps = {
  cloverAddOnsData: CloverAddOnsItemProps[];
};

export const CloverAddOnsSection: FC<CloverAddOnsSectionProps> = ({
  cloverAddOnsData,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="mt-4">
      <SectionHeader title={t('clover-add-ons')} showColumnHeaders />
      <div className="grid grid-cols-8 gap-4">
        {cloverAddOnsData.map((item) => (
          <HardwareItem
            key={item.id}
            title={item.title}
            description={item.description}
            qty={item.qty}
            price={item.price}
            priceLabel={item.priceLabel}
          />
        ))}
      </div>
    </div>
  );
};
