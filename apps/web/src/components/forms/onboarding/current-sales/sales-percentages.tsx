import type { CurrentSalesFields } from '@mavericks/types';
import { FieldLabel } from '@mavericks/ui';
import { Flex, InputNumber } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { forwardRef } from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

type SalesPercentagesFieldsProps = {
  error?: boolean;
  control: Control<CurrentSalesFields>;
};

export const SalesPercentagesFields = forwardRef<
  HTMLDivElement,
  SalesPercentagesFieldsProps
>(({ control }, ref) => {
  const { t } = useTranslation('registration');

  // Labels
  const percentagePlaceholder = t('inputs:percentage-placeholder');
  const cardSwipeLabel = t('inputs:card-swipe-label');
  const onlineLabel = t('inputs:online-label');
  const keyedLabel = t('inputs:keyed-label');

  return (
    <div ref={ref}>
      <Flex gap={10} justify="space-between">
        <div>
          <Controller
            control={control}
            name="salesPercentage.cardSwipePercentage"
            render={({ field, fieldState: { error } }): JSX.Element => (
              <>
                <InputNumber
                  {...field}
                  inputMode="numeric"
                  data-cy="card-swipe-input"
                  className="!w-full"
                  suffix={percentagePlaceholder}
                  max={100}
                  maxLength={3}
                  status={error ? 'error' : undefined}
                />
                <FieldLabel label={cardSwipeLabel} />
              </>
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="salesPercentage.onlinePercentage"
            render={({ field, fieldState: { error } }): JSX.Element => (
              <>
                <InputNumber
                  {...field}
                  inputMode="numeric"
                  data-cy="online-input"
                  className="!w-full"
                  suffix={percentagePlaceholder}
                  max={100}
                  maxLength={3}
                  status={error ? 'error' : undefined}
                />
                <FieldLabel label={onlineLabel} />
              </>
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="salesPercentage.keyedPercentage"
            render={({ field, fieldState: { error } }): JSX.Element => (
              <>
                <InputNumber
                  {...field}
                  inputMode="numeric"
                  data-cy="keyed-input"
                  className="!w-full"
                  suffix={percentagePlaceholder}
                  max={100}
                  maxLength={3}
                  status={error ? 'error' : undefined}
                />
                <FieldLabel label={keyedLabel} />
              </>
            )}
          />
        </div>
      </Flex>
    </div>
  );
});

SalesPercentagesFields.displayName = 'SalesPercentagesFields';
