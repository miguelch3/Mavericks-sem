import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { clientConfig } from '@/config/client';

import { ColumnHeader } from './column-header';
import { FeeCell } from './fee-cell';
import { FooterLink } from './footer-link';
import { RowHeader } from './row-header';

export const TieredCard: FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="grid w-full grid-cols-4 gap-4 rounded-lg border-4 border-gray-100 px-6 py-3 text-center">
      {/* Empty corner cell */}
      <div />

      <ColumnHeader title={t('qualified')} />
      <ColumnHeader title={t('mid-qualified')} />
      <ColumnHeader title={t('non-qualified')} />

      {/* Credit Cards Row */}
      <RowHeader title={t('credit-cards')} />
      <FeeCell percentage="1.40" cents="15" />
      <FeeCell percentage="1.50" cents="15" />
      <FeeCell percentage="1.70" cents="15" />

      {/* Debit Cards Row */}
      <RowHeader title={t('debit-cards')} />
      <FeeCell percentage="1.20" cents="15" />
      <FeeCell percentage="1.30" cents="15" />
      <FeeCell percentage="1.50" cents="15" />

      {/* Footer Links */}
      <div />
      <FooterLink
        href={clientConfig.links.defaultAgreementUrl} // TODO: Add link when available
        text={t('what-does-it-mean')}
      />
      <FooterLink
        href={clientConfig.links.defaultAgreementUrl} // TODO: Add link when available
        text={t('what-does-it-mean')}
      />
      <FooterLink
        href={clientConfig.links.defaultAgreementUrl} // TODO: Add link when available
        text={t('what-does-it-mean')}
      />
    </div>
  );
};
