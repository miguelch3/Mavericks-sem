import { useRegisterBusinessStore } from '@mavericks/store';
import { Flex, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { clientConfig as config } from '@/config/client';

export const PhoneSignInHelpMessage: FC = () => {
  const { t } = useTranslation('registration');

  const businessStore = useRegisterBusinessStore();

  // Labels
  const andLabel = t('common:and');

  const getStartedTermsMessage1Label = t('common:get-started-terms-message-1');
  const getStartedTermsMessage2Label = t('common:get-started-terms-message-2');
  const applicationAndAgreementsLabel = t('common:application-and-agreements');
  const termsAndConditionsLabel = t('common:terms-and-conditions');

  return (
    <Flex vertical align="flex-start" className="my-3 text-xs">
      <p>
        <span>{getStartedTermsMessage1Label}</span>{' '}
        <Typography.Link
          className="!text-xs !underline"
          href={config.links.applicationAndAgreements}
          target="_blank"
          style={{ color: businessStore.primaryColor }}
        >
          {applicationAndAgreementsLabel}
        </Typography.Link>
        <span> {andLabel} </span>
        <Typography.Link
          className="!text-xs !underline"
          href={config.links.terms}
          target="_blank"
          style={{ color: businessStore.primaryColor }}
        >
          {termsAndConditionsLabel}
        </Typography.Link>{' '}
        <span>{getStartedTermsMessage2Label}</span>
      </p>
    </Flex>
  );
};
