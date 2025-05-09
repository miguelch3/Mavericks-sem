import { useGetApplication } from '@mavericks/api-hooks';
import { useRegisterBusinessStore, useSessionStore } from '@mavericks/store';
import { Flex, Spin } from 'antd';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect } from 'react';

type QueryParams = {
  token: string;
};

const OtherOwenrsSign: FC = () => {
  const session = useSessionStore();
  // const businessStore = useRegisterBusinessStore();

  const setContractUrl = useRegisterBusinessStore((s) => s.setContractUrl);
  const setSignatureId = useRegisterBusinessStore((s) => s.setSignatureId);
  const calculateCurrentProgress = useRegisterBusinessStore(
    (s) => s.calculateCurrentProgress
  );

  const router = useRouter();

  const { token } = router.query as QueryParams;

  const { data, isPending } = useGetApplication(
    { leadSignatureId: token ?? '' },
    {
      enabled: !!token,
    }
  );

  useEffect(() => {
    // If data is undefined, we return as it can be loading
    if (data === undefined) return;

    session.clearCookies();

    // First we check if its already signed
    if (data.status === 'signed') {
      session.setStep(13);
      router.push('/').catch(() => {});
      return;
    }

    // If contract_url is present, then we need to sign the contract
    if (data.contract_url) {
      setContractUrl(data.contract_url);
      setSignatureId(token);

      session.setStep(12);
      session.setOthersSigning(true);

      calculateCurrentProgress(12);

      router.push('/').catch(() => {});
      return;
    }

    // If contract_url is not present neither signed, then we redirect to auth
    session.setStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, token]);

  if (isPending) {
    return (
      <Flex justify="center" align="center" className="h-screen">
        <Spin />
      </Flex>
    );
  }

  return null;
};

export default OtherOwenrsSign;
