import { useSessionStore } from '@mavericks/store';
import { useParams, useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useEffect } from 'react';

const AgentIDPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const setAgentId = useSessionStore((s) => s.setAgentId);

  useEffect(() => {
    setAgentId(id || '');
    router.push('/');
  }, [id, router, setAgentId]);

  return null;
};

export default AgentIDPage;
