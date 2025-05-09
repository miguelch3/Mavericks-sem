import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { FeesCardWrapper } from '@/components/fees-card/fees-card-wrapper';
import { PassThroughICCardRow } from '@/components/fees-card/pass-through-ic/pass-through-ic-card-row';
import { clientConfig } from '@/config/client';

export const PassThroughICCard: FC = () => {
  const { t } = useTranslation('common');

  return (
    <FeesCardWrapper>
      <PassThroughICCardRow
        value="0.50%"
        prefix="IC+"
        sub="+15¢ Auth Fee"
        text={t('for-credit-card-transactions')}
        link={clientConfig.links.defaultAgreementUrl} // TODO: Add link when available
      />
      <PassThroughICCardRow
        value="0.50%"
        prefix="IC+"
        sub="+15¢ Auth Fee"
        text={t('for-debit-card-transactions')}
        link={clientConfig.links.defaultAgreementUrl} // TODO: Add link when available
      />
    </FeesCardWrapper>
  );
};
