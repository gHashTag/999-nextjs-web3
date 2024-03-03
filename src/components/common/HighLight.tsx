import React from 'react';

import { cn } from '../../helpers/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const HighLight: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        `p-2 rounded-lg bg-[#262F40] shadow-md text-xs md:text-base`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default HighLight;
