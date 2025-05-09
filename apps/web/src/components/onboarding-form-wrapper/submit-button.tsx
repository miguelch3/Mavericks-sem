import { APIHandledError, ClientFormError } from '@mavericks/types';
import { Button, Flex } from 'antd';
import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';

type Props = {
  buttonMessage?: React.ReactNode;

  hide?: boolean;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  help?: ReactNode;
  error?: unknown;
};

export const SubmitButton: FC<Props> = ({
  hide,
  loading,
  disabled,
  text,
  help,
  error,
  buttonMessage,
}) => {
  const { t } = useTranslation('common');
  const continueLabel = t('continue');

  const knownError = useMemo(() => {
    if (error instanceof APIHandledError) {
      return { message: t(`errors:${error.code}`), type: 'error' };
    }

    if (error instanceof ClientFormError && error.isValid) {
      return { message: t(`errors:${error.code}`), type: error.type };
    }

    return null;
  }, [error, t]);

  return (
    <div className="mt-6 w-full lg:w-96">
      {!hide && (
        <Button
          data-cy="form-submit-button"
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full"
          loading={loading}
          disabled={disabled}
        >
          {text ?? continueLabel}
        </Button>
      )}

      {help && <div className="mt-3">{help}</div>}

      {/* API errors */}
      {knownError && (
        <Flex
          vertical
          align="center"
          className={classNames('my-3 font-medium', {
            'text-primary': knownError.type === 'info',
            'text-red-500': knownError.type === 'error',
          })}
        >
          <p className="text-center">{knownError.message}</p>
        </Flex>
      )}

      {buttonMessage}
    </div>
  );
};
