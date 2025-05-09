import { formatIntlNumber } from '@mavericks/shared';
import type { CurrentSalesFields } from '@mavericks/types';
import {
  MAX_HIGHEST_AMOUNT_VALUE,
  MAX_MONTHLY_CREDIT_CARD_SALES,
  MAX_MONTHLY_TICKET_VALUE,
  MIN_HIGHEST_AMOUNT_VALUE,
  MIN_MONTHLY_CREDIT_CARD_SALES,
  MIN_MONTHLY_TICKET_VALUE,
} from '@mavericks/types';
import { CurrencyInput, FormItem } from '@mavericks/ui';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';
import type { Control } from 'react-hook-form';

type Props = {
  control: Control<CurrentSalesFields>;
};

export const SalesValueFields: FC<Props> = ({ control }) => {
  const { t } = useTranslation('registration');

  const averageMonthlySalesLabel = t('inputs:average-monthly-sales-label');
  const averageTicketValueLabel = t('inputs:average-ticket-value-label');
  const highestAmountToDataProcessedLabel = t(
    'inputs:highest-amount-to-date-label'
  );

  return (
    <>
      <FormItem
        control={control}
        name="averageMonthlyInCreditCard"
        label={averageMonthlySalesLabel}
        errorVars={{
          min: formatIntlNumber(MIN_MONTHLY_CREDIT_CARD_SALES),
          max: formatIntlNumber(MAX_MONTHLY_CREDIT_CARD_SALES),
        }}
      >
        <CurrencyInput name="average-monthly-sales-input" className="!w-full" />
      </FormItem>
      <FormItem
        control={control}
        name="averageTicketValue"
        label={averageTicketValueLabel}
        errorVars={{
          min: formatIntlNumber(MIN_MONTHLY_TICKET_VALUE),
          max: formatIntlNumber(MAX_MONTHLY_TICKET_VALUE),
        }}
      >
        <CurrencyInput name="average-ticket-value-input" className="!w-full" />
      </FormItem>
      <FormItem
        control={control}
        name="highestAmountToDate"
        label={highestAmountToDataProcessedLabel}
        errorVars={{
          min: formatIntlNumber(MIN_HIGHEST_AMOUNT_VALUE),
          max: formatIntlNumber(MAX_HIGHEST_AMOUNT_VALUE),
        }}
      >
        <CurrencyInput
          name="highest-amount-to-date-input"
          className="!w-full"
        />
      </FormItem>
    </>
  );
};
