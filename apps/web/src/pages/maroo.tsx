import { useRegisterBusinessStore, useSessionStore } from '@mavericks/store';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useEffect } from 'react';

import { clientConfig } from '@/config/client';

const AgentIDPage: FC = () => {
  const router = useRouter();
  const setPrimaryColor = useRegisterBusinessStore((s) => s.setPrimaryColorTmp);
  const setSecondaryColor = useRegisterBusinessStore(
    (s) => s.setSecondaryColor
  );
  const setLogoUrl = useRegisterBusinessStore((s) => s.setLogoUrl);
  const setCompanyName = useRegisterBusinessStore((s) => s.setCompanyName);

  const setPbKey = useSessionStore((s) => s.setPbKey);

  useEffect(() => {
    setPrimaryColor('#E48164');
    setSecondaryColor('#f4cabe');
    setLogoUrl('/assets/maroo.png');
    setCompanyName('Maroo');
    setPbKey(clientConfig.api.partnerKey || '');
    router.push('/');
  }, [
    router,
    setLogoUrl,
    setPrimaryColor,
    setSecondaryColor,
    setCompanyName,
    setPbKey,
  ]);

  return null;
};

export default AgentIDPage;
