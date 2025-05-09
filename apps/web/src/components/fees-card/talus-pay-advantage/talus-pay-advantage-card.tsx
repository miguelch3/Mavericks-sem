import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { FeesCardWrapper } from '@/components/fees-card/fees-card-wrapper';
import { TalusPayAdvantageRow } from '@/components/fees-card/talus-pay-advantage/talus-pay-advantage-row';
import { clientConfig } from '@/config/client';

export const TalusPayAdvantageCard: FC = () => {
  const { t } = useTranslation('common');

  return (
    <FeesCardWrapper className="py-4">
      <TalusPayAdvantageRow
        value="0%"
        title={t('you-pay')}
        text={t('for-all-credit-card-transactions')}
        link={clientConfig.links.defaultAgreementUrl} // TODO: Add link when available
      />
      <TalusPayAdvantageRow
        value="4%"
        title={t('customer-pays')}
        text={t('for-all-credit-card-transactions')}
        link={clientConfig.links.defaultAgreementUrl} // TODO: Add link when available
      />
    </FeesCardWrapper>
  );
};
