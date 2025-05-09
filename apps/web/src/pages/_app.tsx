// /* eslint-disable react-hooks/exhaustive-deps */
import '@/theme/globals.css';

import { SourceType } from '@mavericks/types';
import type { LoadScriptProps } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ThemeConfig } from 'antd';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import type { AppPropsWithLayout } from '@/common-types/next';
import { ClymWidget } from '@/components/clym-widget';
import { LoadMerchantWrapper } from '@/components/load-merchant/load-merchant-wrapper';
import { clientConfig } from '@/config/client';
import { FullPageLayout } from '@/layout/full-page-layout';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const libraries: LoadScriptProps['libraries'] = ['places'];

const queryClient = new QueryClient();

const App: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const router = useRouter();

  // We expect the url to have a param like https://{url}/?source=mobile
  const source = router.query.source as SourceType;

  const googleApiKey = clientConfig.google.apiKey;

  const { isLoaded: isGoogleMapsLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries,
  });

  const Layout = Component.Layout ?? FullPageLayout;

  // TODO: Create dynamically
  const theme: ThemeConfig = {
    components: {
      Form: {
        labelColor: '#374975',
        fontSize: 14,
      },
      Button: {
        primaryShadow: 'false',
      },
    },
    token: {
      fontWeightStrong: 500,
      fontFamily: 'Poppins',
      fontSize: 16,
      colorPrimary: '#374975',
      colorTextTertiary: 'rgb(81, 81, 81)',
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <Head>
          <title>Talus - Merchant Application</title>
        </Head>

        <LoadMerchantWrapper isLoading={!isGoogleMapsLoaded}>
          <Layout>
            <Component {...pageProps} />
            {source !== SourceType.MOBILE && <ClymWidget />}
          </Layout>
        </LoadMerchantWrapper>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
