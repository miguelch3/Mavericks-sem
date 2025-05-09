import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { SectionHeader } from '@/components/services-fees/common/section-header';

type GatewayItemProps = {
  id: string;
  title: string;
  description: string;
};

type GatewaySectionProps = {
  gatewayData: GatewayItemProps[];
};

export const GatewaySection: FC<GatewaySectionProps> = ({ gatewayData }) => {
  const { t } = useTranslation('common');

  return (
    <div className="mt-4">
      <SectionHeader title={t('gateway-virtual-terminals')} />
      <div>
        {gatewayData.map((item) => (
          <div key={item.id}>
            <p className="font-medium text-primary">{item.title}</p>
            <p className="text-sm font-medium text-dark-gray">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
