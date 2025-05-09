import type { FC } from 'react';

import { DownloadPdfButton } from './download-pdf-button';

type Props = {
  url: string;
  title?: string;
  downloadText?: string;
};

export const PdfViewer: FC<Props> = ({ url, title, downloadText }) => {
  return (
    <div className="rounded-xl border-2 pb-3">
      <div className="flex justify-between border-b-2 p-3">
        <p className="text-lg font-medium ">{title}</p>

        <DownloadPdfButton
          url={url}
          filename="agreement.pdf"
          text={downloadText}
        />
      </div>

      <div>
        <iframe
          src={`${url}#toolbar=0`}
          width="100%"
          height="425px"
          title="reader"
        />
      </div>
    </div>
  );
};
