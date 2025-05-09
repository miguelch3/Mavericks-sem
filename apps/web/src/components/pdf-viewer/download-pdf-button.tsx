import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import type { FC } from 'react';

type Props = {
  url: string;
  text?: string;
  filename?: string;
};

export const DownloadPdfButton: FC<Props> = ({
  url,
  text,
  filename = 'file.pdf',
}) => {
  const { t } = useTranslation('common');

  const handleDownload = async (): Promise<void> => {
    try {
      const response = await axios.get(url, {
        responseType: 'blob', // Important: tells axios to handle the response as a binary blob
      });

      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // We can log the error to the console
      // eslint-disable-next-line no-console
      console.log('Error downloading PDF:', error);
    }
  };

  return (
    <button onClick={handleDownload} type="button">
      <p className="text-sm font-semibold text-primary hover:underline">
        {text || t('download-file')}
      </p>
    </button>
  );
};
