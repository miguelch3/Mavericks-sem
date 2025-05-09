import { useRegisterBusinessStore } from '@mavericks/store';
import { Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { clientConfig as config } from '@/config/client';

export const ClickToSignParagraph: FC = () => {
  const { t } = useTranslation('registration');

  // TODO: Replace with theme store hook once ready
  const theme = useRegisterBusinessStore();

  // Labels
  const theLabel = t('common:the');
  const andLabel = t('common:and');

  const clickToSignParagraph1 = t('click-to-sign-paragraph-1');
  const clickToSignParagraph2 = t('click-to-sign-paragraph-2');
  const clickToSignParagraph3 = t('click-to-sign-paragraph-3');
  const clickToSignParagraph4 = t('click-to-sign-paragraph-4');
  const clickToSignParagraph5 = t('click-to-sign-paragraph-5');
  const clickToSignParagraph6 = t('click-to-sign-paragraph-6');

  const merchantApplicationLabel = t('common:merchant-application');
  const termsAndConditionsLabel = t('common:terms-and-conditions');
  const personalGuarantyLabel = t('common:personal-guaranty');
  const achTermsLabel = t('common:ach-terms');
  const seeESignDisclosureLabel = t('common:see-e-sign-disclosure');

  return (
    <p>
      {clickToSignParagraph1}{' '}
      <Typography.Link
        className="!text-sm !underline"
        href={config.links.applicationAndAgreements}
        target="_blank"
        style={{ color: theme.primaryColor }}
      >
        {merchantApplicationLabel}
      </Typography.Link>{' '}
      {clickToSignParagraph2}{' '}
      <Typography.Link
        className="!text-sm !underline"
        href={config.links.applicationAndAgreements}
        target="_blank"
        style={{ color: theme.primaryColor }}
      >
        {merchantApplicationLabel}
      </Typography.Link>{' '}
      {andLabel}{' '}
      <Typography.Link
        className="!text-sm !underline"
        href={config.links.terms}
        target="_blank"
        style={{ color: theme.primaryColor }}
      >
        {termsAndConditionsLabel}
      </Typography.Link>
      {clickToSignParagraph3}{' '}
      <Typography.Link
        className="!text-sm !underline"
        href={config.links.personalGuaranty}
        target="_blank"
        style={{ color: theme.primaryColor }}
      >
        {personalGuarantyLabel}
      </Typography.Link>{' '}
      {andLabel} {theLabel}{' '}
      <Typography.Link
        className="!text-sm !underline"
        href={config.links.achTerms}
        target="_blank"
        style={{ color: theme.primaryColor }}
      >
        {achTermsLabel}
      </Typography.Link>{' '}
      {clickToSignParagraph4}
      {' ('}
      <Typography.Link
        className="!text-sm !underline"
        href={config.links.eSignDisclosure}
        target="_blank"
        style={{ color: theme.primaryColor }}
      >
        {seeESignDisclosureLabel}
      </Typography.Link>
      {') '}
      {clickToSignParagraph5}
      <br />
      <br />
      {clickToSignParagraph6}
    </p>
  );
};
