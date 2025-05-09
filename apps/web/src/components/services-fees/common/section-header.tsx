import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

export type SectionHeaderProps = {
  title: string;
  showColumnHeaders?: boolean;
};

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  showColumnHeaders = false,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="mb-3">
      {showColumnHeaders ? (
        <div className="grid grid-cols-8 gap-4">
          <h4 className="col-span-6 text-lg font-semibold text-primary">
            {title}
          </h4>
          <h4 className="text-center text-lg font-medium text-primary">
            {t('qty')}
          </h4>
          <h4 className="text-right text-lg font-medium text-primary">
            {t('price')}
          </h4>
        </div>
      ) : (
        <h4 className="text-lg font-semibold text-primary">{title}</h4>
      )}
    </div>
  );
};
