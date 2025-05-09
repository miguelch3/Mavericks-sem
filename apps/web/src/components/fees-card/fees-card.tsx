import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { clientConfig } from '@/config/client';

import { FeesCardRow } from './fees-card-row';

export const FeesCard: FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-row justify-around rounded-lg border-2 p-6">
      <FeesCardRow
        value={`${clientConfig.data.cardPresentPercentage}%`}
        sub={`+${clientConfig.data.cardPresentFeeAmount}¢`}
        text={t('present-transactions')}
      />
      <FeesCardRow
        value={`${clientConfig.data.nonCardPresentPercentage}%`}
        sub={`+${clientConfig.data.nonCardPresentFeeAmount}¢`}
        text={t('not-present-transactions')}
      />
      <FeesCardRow
        value={`$${clientConfig.data.monthlyServiceFee}`}
        sub={`/${t('month')}`}
        text={t('monthly-subscription-fee')}
      />
    </div>
  );
};
