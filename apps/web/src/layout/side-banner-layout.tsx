import { Flex } from 'antd';
import type { FC, PropsWithChildren } from 'react';

import { SideBanner } from '@/components/side-banner/side-banner';

export const SideBannerLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen w-screen">
      <Flex
        justify="space=between"
        className="get-started-form h-full flex-col lg:flex-row"
      >
        <SideBanner />
        {children}
      </Flex>
    </div>
  );
};
