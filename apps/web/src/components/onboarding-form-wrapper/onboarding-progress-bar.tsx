import { useRegisterBusinessStore } from '@mavericks/store';
import { Progress } from 'antd';
import classNames from 'classnames';
import type { FC } from 'react';

type RawProps = {
  isMobile?: boolean;
  progress: number;
};

export const RawOnboardingProgressBar: FC<RawProps> = ({
  isMobile,
  progress,
}) => {
  const store = useRegisterBusinessStore();

  const customSize: [string | number, number] | undefined = !isMobile
    ? [180, 10]
    : undefined;

  return (
    <Progress
      className={classNames({
        'lg:!hidden': isMobile,
        '!hidden lg:!inline-block': !isMobile,
      })}
      showInfo={false}
      percent={progress}
      strokeColor={store.primaryColor}
      size={customSize}
    />
  );
};

export const OnboardingProgressBar: FC = () => {
  const store = useRegisterBusinessStore();

  return (
    <>
      <RawOnboardingProgressBar progress={store.progress} isMobile />
      <RawOnboardingProgressBar progress={store.progress} />
    </>
  );
};
