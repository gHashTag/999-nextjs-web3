import React from 'react';

import { cn } from '../../helpers/utils';

interface Props {
  children: React.ReactNode;
  className: string;
}

const Paragraph: React.FC<Props> = ({ children, className }) => {
  return <div className={cn(`${className}`)}>{children}</div>;
};

export default Paragraph;
