import { useRegisterBusinessStore } from '@mavericks/store';
import { Flex, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { clientConfig as config } from '@/config/client';

export const VerifyOTPHelpMessage: FC = () => {
  const { t } = useTranslation('registration');

  // TODO: Move to theme store once its ready
  const businessStore = useRegisterBusinessStore();

  // Labels
  const verifyPhoneNumberMessage1 = t('common:verify-phone-number-message-1');
  const verifyPhoneNumberMessage2 = t('common:verify-phone-number-message-2');
  const privacyPolicyLabel = t('common:privacy-policy');

  return (
    <Flex vertical align="flex-start" className="my-3 text-xs">
      <p>
        <span>{verifyPhoneNumberMessage1}</span>{' '}
        <Typography.Link
          className="!text-xs !underline"
          href={config.links.privacyPolicy}
          target="_blank"
          style={{ color: businessStore.primaryColor }}
        >
          {privacyPolicyLabel}
        </Typography.Link>
        <span> {verifyPhoneNumberMessage2}</span>
      </p>
    </Flex>
  );
};
