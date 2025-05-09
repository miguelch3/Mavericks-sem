import { useRegisterBusinessStore } from '@mavericks/store';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useEffect } from 'react';

const AgentIDPage: FC = () => {
  const router = useRouter();
  const setPrimaryColor = useRegisterBusinessStore((s) => s.setPrimaryColor);
  const setSecondaryColor = useRegisterBusinessStore(
    (s) => s.setSecondaryColor
  );
  const setLogoUrl = useRegisterBusinessStore((s) => s.setLogoUrl);
  const setCompanyName = useRegisterBusinessStore((s) => s.setCompanyName);

  useEffect(() => {
    setPrimaryColor('#596063');
    setSecondaryColor('#d7dadb');
    setLogoUrl('/assets/heartland.png');
    setCompanyName('Heartland');
    router.push('/');
  }, [router, setLogoUrl, setPrimaryColor, setSecondaryColor, setCompanyName]);

  return null;
};

export default AgentIDPage;
