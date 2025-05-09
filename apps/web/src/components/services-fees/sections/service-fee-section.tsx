import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { FeeItem } from '@/components/services-fees/common/fee-item';
import { SectionHeader } from '@/components/services-fees/common/section-header';

type ServiceFeeItemProps = {
  title: string;
  description: string;
  price: string;
  priceLabel: string;
};

type ServiceFeeSectionProps = {
  serviceFeeItem: ServiceFeeItemProps;
};

export const ServiceFeeSection: FC<ServiceFeeSectionProps> = ({
  serviceFeeItem,
}) => {
  const { t } = useTranslation('common');

  return (
    <div>
      <SectionHeader title={t('service-fees')} />
      <FeeItem
        title={serviceFeeItem.title}
        description={serviceFeeItem.description}
        price={serviceFeeItem.price}
        priceLabel={serviceFeeItem.priceLabel}
      />
    </div>
  );
};
