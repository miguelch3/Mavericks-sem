import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRegisterBusinessStore } from '@mavericks/store';
import { OwnerIndex } from '@mavericks/types';
import { Button, Card, Flex } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

type Props = {
  index: OwnerIndex;
  name: string;
  email: string;
  ownershipPercentage: number;
  disabled?: boolean;
  onEdit: () => void;
  onDelete: () => void | Promise<void>;
};

export const BusinessOwnerCard: FC<Props> = ({
  index,
  email,
  name,
  ownershipPercentage,
  disabled,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation('common');
  const primaryColor = useRegisterBusinessStore((s) => s.primaryColor);

  const ownershipLabel = t('ownership');

  const nameForId = name.toLowerCase().replaceAll(' ', '-');

  return (
    <Card
      className="owners-card my-2 !bg-slate-100"
      style={{ borderColor: primaryColor }}
    >
      <Flex justify="space-between">
        <Flex vertical className="w-full">
          <Flex justify="space-between" className="w-full" gap={2}>
            <span className="grow text-xl font-medium">{name}</span>
            <span
              className="text-end text-sm font-semibold"
              style={{ color: primaryColor }}
            >
              {ownershipPercentage}% {ownershipLabel}
            </span>
          </Flex>
          <Flex justify="space-between" align="center">
            <span>{email}</span>
            <Flex>
              {index !== OwnerIndex.One && (
                <Button
                  data-cy={`${nameForId}-delete-button`}
                  icon={<DeleteOutlined />}
                  type="text"
                  onClick={onDelete}
                  style={{ color: primaryColor }}
                  disabled={disabled}
                />
              )}
              <Button
                data-cy={`${nameForId}-edit-button`}
                icon={<EditOutlined />}
                type="text"
                onClick={onEdit}
                style={{ color: primaryColor }}
                disabled={disabled}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
