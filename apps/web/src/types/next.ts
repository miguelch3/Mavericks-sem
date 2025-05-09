import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  Layout?: React.FC<React.PropsWithChildren>;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
