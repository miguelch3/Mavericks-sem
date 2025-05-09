import type { NextPageWithLayout } from '@/common-types/next';
import { FormHandler } from '@/components/forms/onboarding/form-handler';
import { SideBannerLayout } from '@/layout/side-banner-layout';

const MainPage: NextPageWithLayout = () => {
  return <FormHandler />;
};

MainPage.Layout = SideBannerLayout;

export default MainPage;
