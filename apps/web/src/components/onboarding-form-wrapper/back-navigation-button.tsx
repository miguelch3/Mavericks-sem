import { LeftOutlined } from '@ant-design/icons';
import { useRegisterBusinessStore } from '@mavericks/store';
import { Button } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

type WrapperProps = {
  loading?: boolean;
  onGoBack: () => void;
};

type Props = WrapperProps & {
  isMobile?: boolean;
};

const RawBackNavigationButton: FC<Props> = ({
  onGoBack,
  loading,
  isMobile,
}) => {
  const { t } = useTranslation('common');
  const goBackLabel = t('go-back');

  return (
    <Button
      type="text"
      className={classNames('!px-0 !text-sm mt-1', {
        '!hidden lg:!inline-block': !isMobile,
      })}
      onClick={onGoBack}
      icon={<LeftOutlined />}
      disabled={loading}
    >
      {goBackLabel}
    </Button>
  );
};

export const BackNavigationButton: FC<WrapperProps> = ({
  onGoBack,
  loading,
}) => {
  const logoUrl = useRegisterBusinessStore((s) => s.logoUrl);

  return (
    <>
      <div>
        {onGoBack && (
          <RawBackNavigationButton onGoBack={onGoBack} loading={loading} />
        )}
      </div>
      {/* Mobile top logo & back button */}
      <div className="my-2 mt-5 flex flex-col items-center justify-center lg:hidden">
        {onGoBack && (
          <div className="w-full">
            <RawBackNavigationButton
              onGoBack={onGoBack}
              loading={loading}
              isMobile
            />
          </div>
        )}

        <Image src={logoUrl} alt="logo" width={140} height={15} />
      </div>
    </>
  );
};
