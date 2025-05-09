import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

const PhoneSignInInputHelp: FC = () => {
  const { t } = useTranslation('registration');

  const verifyPhoneHelp = t('verify-phone-help');
  const verifyPhoneRatesHelp = t('verify-phone-rates-help');

  return (
    <>
      {verifyPhoneHelp}
      <br />
      {verifyPhoneRatesHelp}
    </>
  );
};

export default PhoneSignInInputHelp;
