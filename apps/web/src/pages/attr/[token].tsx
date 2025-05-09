import { useSessionStore } from '@mavericks/store';
import { AttributionUrlOutputSchema } from '@mavericks/types';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect } from 'react';

type QueryParams = {
  token: string;
};

const TestToken: FC = () => {
  const router = useRouter();
  const setLeadId = useSessionStore((state) => state.setLeadId);

  const { token } = router.query as QueryParams;

  const setAttributionUrlData = useSessionStore(
    (state) => state.setAttributionUrlData
  );

  useEffect(() => {
    if (token) {
      let decoded = '{}'; // Empty object to avoid error when parsing
      try {
        decoded = atob(token);
      } catch (error) {
        decoded = '{}';
      }

      const parsed = AttributionUrlOutputSchema.safeParse(JSON.parse(decoded));

      if (parsed.success) {
        setAttributionUrlData(parsed.data);
        setLeadId(parsed.data.lead_id || '');
      }
    }

    router.push('/').catch(() => {});
  }, [router, setAttributionUrlData, token, setLeadId]);

  return null;
};

export default TestToken;
