import { useRegisterBusinessStore } from '@mavericks/store';
import { Flex, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { clientConfig as config } from '@/config/client';

export const ButtonAgreementMessage: FC = () => {
  const { t } = useTranslation('registration');

  const theme = useRegisterBusinessStore();

  // Labels
  const incidentalsFeesWarningLabel = t('incidental-fees-warning');
  const incidentalsFeesWarningLabel2 = t('incidental-fees-warning-2');

  const andLabel = t('common:and');

  const merchantApplicationLabel = t('common:merchant-application');
  const termsAndConditionsLabel = t('common:terms-and-conditions');

  return (
    <Flex vertical align="flex-start" className="my-3 max-w-[630px] text-xs">
      <p className="text-sm">
        <span>{incidentalsFeesWarningLabel}</span>{' '}
        <Typography.Link
          className="!text-sm !underline"
          href={config.links.applicationAndAgreements}
          target="_blank"
          style={{ color: theme.primaryColor }}
        >
          {merchantApplicationLabel}
        </Typography.Link>
        <span> {andLabel} </span>
        <Typography.Link
          className="!text-sm !underline"
          href={config.links.terms}
          target="_blank"
          style={{ color: theme.primaryColor }}
        >
          {termsAndConditionsLabel}
        </Typography.Link>
        {incidentalsFeesWarningLabel2}
      </p>
    </Flex>
  );
};
