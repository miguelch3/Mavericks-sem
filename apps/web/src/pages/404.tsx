/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import type { NextPageWithLayout } from '@/common-types/next';

const PageNotFound: NextPageWithLayout = () => (
  <div className="flex justify-center">
    <Head>
      <title>Page not found</title>
    </Head>
    <h1 className="px-6 text-4xl font-bold sm:text-5xl">404</h1>
    <div>
      <div className="border-l-2 px-6">
        <h2 className="mb-2 text-4xl font-bold sm:text-5xl">Page not found</h2>
        <p className="text-sm font-semibold text-gray-400 sm:text-base">
          Please check the URL in the address bar and try again.
        </p>
      </div>
      <Link href="/" passHref legacyBehavior>
        <a>
          <Button className="mt-9">Go back home</Button>
        </a>
      </Link>
    </div>
  </div>
);

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <main className="flex h-screen items-center justify-center">
      {children}
    </main>
  );
};
PageNotFound.Layout = Layout;

export default PageNotFound;
