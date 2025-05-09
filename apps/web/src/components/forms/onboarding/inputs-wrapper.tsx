import { Flex } from 'antd';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  gap?: number;
  horizontal?: boolean;
};

export const InputsWrapper: FC<PropsWithChildren<Props>> = ({
  children,
  gap,
  horizontal,
}) => (
  <Flex vertical={!horizontal} gap={gap ?? 15} className="w-full px-1 lg:w-96">
    {children}
  </Flex>
);
