import { useRegisterBusinessStore } from '@mavericks/store';
import type { BusinessOwner } from '@mavericks/types';
import { Card, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { useJobTitles } from '@/api-hooks/onboarding';

type Props = {
  owner: BusinessOwner;
};

export const ManagementOverviewCard: FC<Props> = ({ owner }) => {
  const { t } = useTranslation('common');
  const primaryColor = useRegisterBusinessStore((s) => s.primaryColor);

  const { firstName, lastName, middleName } = owner.name;

  const ownerFullName = `${firstName} ${middleName ?? ''} ${lastName}`.trim();

  const { data: jobTitles, isPending } = useJobTitles();

  const ownerJobTitle = jobTitles?.find(
    (jobTitle) => jobTitle.value === owner.jobTitle
  );

  // Labels
  const email = t('email');
  const dob = t('dob');
  const otherInfoProvided = t('other-info-provided');
  const ssn = t('ssn');
  const address = t('address');

  return (
    <Card
      className="review-card !bg-slate-100"
      style={{ borderColor: primaryColor }}
      loading={isPending}
    >
      <Typography.Text className="!text-xl">{ownerFullName}</Typography.Text>
      <br />
      <Typography.Text className="!text-sm">
        {ownerJobTitle?.label}
      </Typography.Text>

      <br />
      <br />
      <Typography.Text className="!text-sm">
        <span className="font-medium">{email}:</span> {owner.email} <br />
        <span className="font-medium">{dob}:</span>{' '}
        {owner.dateOfBirth?.format('MM/DD/YYYY')} <br />
      </Typography.Text>

      <br />
      <Typography.Text className="!text-sm font-medium">
        {otherInfoProvided}
      </Typography.Text>
      <br />
      <Typography.Text className="!text-sm">
        {ssn}, {dob}, {address}
      </Typography.Text>
    </Card>
  );
};
