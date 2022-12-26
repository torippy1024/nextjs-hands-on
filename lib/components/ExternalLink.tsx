import {ReactNode} from 'react';

type ExternalLinkType = {
  href: string;
  children: ReactNode;
  underline?: boolean;
};

const ExternalLink = ({href, children, underline = true}: ExternalLinkType) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={`${underline && 'underline'} hover:no-underline`}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
