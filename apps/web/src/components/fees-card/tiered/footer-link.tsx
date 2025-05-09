import type { FC } from 'react';

type FooterLinkProps = {
  href: string;
  text: string;
};

export const FooterLink: FC<FooterLinkProps> = ({ href, text }) => {
  return (
    <a
      href={href}
      className="text-xs font-medium text-primary underline decoration-dashed underline-offset-4 hover:text-primary/80"
    >
      {text}
    </a>
  );
};
