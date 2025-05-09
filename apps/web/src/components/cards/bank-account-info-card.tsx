import { useRegisterBusinessStore } from '@mavericks/store';
import type { BankAccount } from '@mavericks/types';
import { Card, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

type Props = {
  bankAccount: BankAccount;
};

export const BankAccountInfoCard: FC<Props> = ({ bankAccount }) => {
  const { t } = useTranslation('common');
  const primaryColor = useRegisterBusinessStore((s) => s.primaryColor);

  // Labels
  const routingNumber = t('routing-number');
  const accountNumber = t('account-number');

  return (
    <Card
      className="review-card !bg-slate-100"
      style={{ borderColor: primaryColor }}
    >
      <Typography.Text className="!text-xl  ">
        {bankAccount.bankName}
      </Typography.Text>
      <br />
      <Typography.Text className="!text-sm">
        <span className="font-medium">{routingNumber}: </span>
        {bankAccount.routingNumber} <br />
        <span className="font-medium">{accountNumber}: </span> *******
        {bankAccount.accountNumber.number.slice(-4)}
      </Typography.Text>
    </Card>
  );
};
