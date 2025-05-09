import { Typography } from 'antd';
import classNames from 'classnames';
import type { FC, ReactNode } from 'react';

type Props = {
  title: string;
  className?: string;
  subtitle?: string | ReactNode;
  showProgress?: boolean;
  hasGoBack?: boolean;
};

export const OnboardingFormTitle: FC<Props> = ({
  title,
  subtitle,
  showProgress,
  hasGoBack,
  className,
}) => {
  return (
    <div
      className={classNames('mb-6 mt-3 lg:mt-4 px-1', className, {
        'lg:mt-12': !hasGoBack,
        'pt-14 mt-0': !showProgress && !hasGoBack,
        'pt-6 mt-0': !showProgress && hasGoBack,
      })}
    >
      <Typography.Title
        level={3}
        className={classNames('font-400', className)}
        style={{ marginBottom: 0 }}
      >
        {title}
      </Typography.Title>

      {subtitle && (
        <Typography.Text type="secondary">
          {typeof subtitle === 'string' ? subtitle : subtitle}
        </Typography.Text>
      )}
    </div>
  );
};
