import { useRegisterBusinessStore } from '@mavericks/store';
import { Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { clientConfig as config } from '@/config/client';

export const OwnerInformationSubtitle: FC = () => {
  const { t } = useTranslation('registration');

  const businessStore = useRegisterBusinessStore();

  const personalGuarantee = t('common:personal-guarantee');
  const defaultSubtitleMessage1 = t('verify-that-you-represent-subtitle-1');
  const defaultSubtitleMessage2 = t('verify-that-you-represent-subtitle-2');

  return (
    <p className="text-sm">
      {defaultSubtitleMessage1}{' '}
      <Typography.Link
        className="!text-sm !underline"
        href={config.links.personalGuaranty}
        target="_blank"
        style={{ color: businessStore.primaryColor }}
      >
        {personalGuarantee}.
      </Typography.Link>{' '}
      {defaultSubtitleMessage2}
    </p>
  );
};
