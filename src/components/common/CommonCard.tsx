import React from 'react';

import { cn } from '../../helpers/utils';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const CommonCard: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'w-full bg-[#191919] rounded-2xl grid md:grid-cols-[1.5fr,1fr] grid-cols-1 items-center justify-center my-16',
        className
      )}
    >
      {children}
    </div>
  );
};

export default CommonCard;
