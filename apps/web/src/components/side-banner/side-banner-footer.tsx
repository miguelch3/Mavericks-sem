import { useSessionStore } from '@mavericks/store';
import { AppEnvironment } from '@mavericks/types';
import { Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

import { clientConfig as config } from '@/config/client';

const FooterLinks = [
  // {
  //   text: 'help',
  //   to: config.links.help,
  //   },
  {
    text: 'terms-and-conditions',
    to: config.links.terms,
  },
  {
    text: 'privacy-policy',
    to: config.links.privacyPolicy,
  },
];

export const SideBannerFooter: FC = () => {
  const { t } = useTranslation('registration');
  const sessionStore = useSessionStore();

  return (
    <div className="flex flex-col items-center p-3 lg:items-start lg:p-0">
      {FooterLinks.map((i) => (
        <Typography.Link
          key={`${i.text}-link`}
          href={i.to}
          className="!text-gray-500 hover:!text-gray-800"
        >
          {t(`common:${i.text}`)}
        </Typography.Link>
      ))}

      {/* Helpers */}
      {config.app.env !== AppEnvironment.PRODUCTION && (
        <p className="text-gray-500">v{config.app.version}</p>
      )}
      {config.app.env !== AppEnvironment.PRODUCTION && sessionStore.agentId && (
        <p className="text-gray-500">AgentID: {sessionStore.agentId}</p>
      )}
    </div>
  );
};
