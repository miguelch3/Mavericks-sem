import { useRegisterBusinessStore } from '@mavericks/store';
import { Flex, Spin } from 'antd';
import type { FC, PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { useGetMerchantData } from '@/hooks/use-get-merchant-data';

type LoadMerchantWrapperProps = PropsWithChildren<{
  isLoading?: boolean;
}>;

export const LoadMerchantWrapper: FC<LoadMerchantWrapperProps> = ({
  children,
  isLoading,
}) => {
  const setError = useRegisterBusinessStore((s) => s.setError);

  const merchant = useGetMerchantData();

  useEffect(() => {
    merchant.loadLeadData().catch(setError);
    // We need to disable this as the loadMerchant just runs on initial loading
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setError]);

  if (merchant.isInitialLoading || isLoading) {
    return (
      <Flex justify="center" align="center" className="h-screen">
        <Spin />
      </Flex>
    );
  }

  return children;
};
