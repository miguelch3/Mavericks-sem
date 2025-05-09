/* eslint-disable react/no-danger */
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type { NextPage } from 'next';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const AppDocument: NextPage = () => {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script src="https://widget.clym-sdk.net/blocking.js" async />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

AppDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<unknown> => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = (): DocumentInitialProps | Promise<DocumentInitialProps> =>
    originalRenderPage({
      enhanceApp: (App) => (props) => {
        return (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        );
      },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default AppDocument;
