import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

type Props = {
  value: string;
  prefix: string;
  sub: string;
  text: string;
  link?: string;
};

export const PassThroughICCardRow: FC<Props> = ({
  value,
  prefix,
  sub,
  text,
  link,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex max-w-[170px] flex-col justify-start gap-2 md:gap-3">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="!leading-4">
          <div className="flex items-center justify-center gap-1">
            <p className="text-xs font-medium text-primary md:text-base">
              {prefix}
            </p>
            <p className="text-xl font-medium text-primary md:text-3xl">
              {value}
            </p>
          </div>

          <p className="text-center text-sm font-medium text-primary">{sub}</p>
        </div>

        <p className="text-center text-xs font-medium !leading-4 text-dark-gray md:text-base">
          {text}
        </p>

        {link && (
          <a
            href={link}
            className="text-xs font-medium text-primary underline decoration-dashed underline-offset-4 hover:text-primary/80"
          >
            {t('what-does-it-mean')}
          </a>
        )}
      </div>
    </div>
  );
};
