import { useRegisterBusinessStore } from '@mavericks/store';
import type { Address } from '@mavericks/types';
import { Card, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

type Props = {
  businessName: string;
  businessWebsite: string;
  address: Address;
};

export const BusinessOverviewCard: FC<Props> = ({
  address,
  businessName,
  businessWebsite,
}) => {
  const { t } = useTranslation('common');
  const primaryColor = useRegisterBusinessStore((s) => s.primaryColor);

  const otherInfoProvided = t('other-info-provided');
  const ein = t('ein');
  const phone = t('phone');
  const salesInfo = t('sales-info');

  return (
    <Card
      className="review-card !bg-slate-100"
      style={{ borderColor: primaryColor }}
    >
      <Typography.Text className="!text-xl font-normal">
        {businessName}
      </Typography.Text>
      <br />
      <Typography.Text className="!text-sm">{businessWebsite}</Typography.Text>

      <br />
      <br />
      <Typography.Text className="!text-sm">
        {address.addressOne} <br />
        {address.city}, {address.state} {address.zip}
      </Typography.Text>

      <br />
      <br />
      <Typography.Text className="!text-sm font-medium">
        {otherInfoProvided}
      </Typography.Text>
      <br />
      <Typography.Text className="!text-sm">
        {ein}, {phone}, {salesInfo}
      </Typography.Text>
    </Card>
  );
};
