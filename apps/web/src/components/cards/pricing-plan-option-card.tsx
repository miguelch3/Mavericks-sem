import { Card, Flex, Typography } from 'antd';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

type Props = {
  image: string;
  name: string;
  description: string;
  pricing: string;
  infoLink: string;
};

export const PricingPlanOptionCard: FC<Props> = ({
  image,
  name,
  description,
  pricing,
  infoLink,
}) => {
  const { t } = useTranslation('common');

  // Labels
  const moreInfo = t('more-info');

  return (
    <Card className="!my-1 grow">
      <Flex gap={20} className="flex-col xl:flex-row">
        <Image src={image} width={180} height={180} alt={name} />
        <Flex vertical justify="space-between" className="w-full">
          <div>
            <Typography.Title level={3}>{name}</Typography.Title>
            {description}
            <Typography.Title level={5}>{pricing}</Typography.Title>
          </div>
          <Typography.Link className="text-end !text-blue-900" href={infoLink}>
            {moreInfo}
          </Typography.Link>
        </Flex>
      </Flex>
    </Card>
  );
};
