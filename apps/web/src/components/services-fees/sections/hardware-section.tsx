import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { HardwareItem } from '@/components/services-fees/common/hardware-item';
import { SectionHeader } from '@/components/services-fees/common/section-header';

type HardwareDataProps = {
  id: string;
  title: string;
  qty: number;
  price: string;
  description: string;
  priceLabel: string;
};

type HardwareSectionProps = {
  hardwareData: HardwareDataProps[];
};

export const HardwareSection: FC<HardwareSectionProps> = ({ hardwareData }) => {
  const { t } = useTranslation('common');

  return (
    <div className="mt-4">
      <SectionHeader title={t('hardware')} showColumnHeaders />
      <div className="grid grid-cols-8 gap-4">
        {hardwareData.map((item) => (
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
