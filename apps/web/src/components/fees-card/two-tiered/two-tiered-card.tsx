import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { FeesCardWrapper } from '@/components/fees-card/fees-card-wrapper';
import { clientConfig } from '@/config/client';

import { TwoTieredRow } from './two-tiered-row';

export const TwoTieredCard: FC = () => {
  const { t } = useTranslation('common');

  return (
    <FeesCardWrapper>
      <TwoTieredRow
        value={`${clientConfig.data.cardPresentPercentage}%`}
        sub={`+${clientConfig.data.cardPresentFeeAmount}¢`}
        text={t('present-transactions')}
        link={clientConfig.links.defaultAgreementUrl} // TODO: Add link when available
      />
      <TwoTieredRow
        value={`${clientConfig.data.nonCardPresentPercentage}%`}
        sub={`+${clientConfig.data.nonCardPresentFeeAmount}¢`}
        text={t('not-present-transactions')}
        link={clientConfig.links.defaultAgreementUrl} // TODO: Add link when available
      />
    </FeesCardWrapper>
  );
};
