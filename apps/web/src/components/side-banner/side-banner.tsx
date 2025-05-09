import { useRegisterBusinessStore } from '@mavericks/store';
import { Flex, Typography } from 'antd';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { SideBannerFooter } from './side-banner-footer';

export const SideBanner: FC = () => {
  const { t } = useTranslation('registration');

  const primaryColor = useRegisterBusinessStore((s) => s.primaryColorTmp);
  const secondaryColor = useRegisterBusinessStore((s) => s.secondaryColor);
  const logoUrl = useRegisterBusinessStore((s) => s.logoUrl);
  const companyName = useRegisterBusinessStore((s) => s.companyName) || 'Talus';

  // Labels
  const getStartedLabel = t('get-started-with-talus', { companyName });

  return (
    <Flex
      vertical
      justify="space-between"
      className="z-10 !hidden h-full min-w-fit p-10 pr-36 lg:!flex"
      style={{ backgroundColor: secondaryColor }}
    >
      <div>
        <Image
          src={logoUrl}
          alt="logo"
          width={172}
          height={35}
          className="mb-10"
        />
        <Typography.Title
          level={3}
          className="font-400"
          style={{ color: primaryColor }}
        >
          {getStartedLabel}
        </Typography.Title>
      </div>

      <SideBannerFooter />
    </Flex>
  );
};
