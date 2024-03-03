import React from 'react';

import { cn } from '../../../helpers/utils';

interface IPill {
  isSmall?: boolean;
  isMedium?: boolean;
  children: React.ReactNode;
  isGreen?: boolean;
}

const Pill: React.FC<IPill> = ({ isSmall, isMedium, children, isGreen }) => {
  return (
    <span
      className={cn(
        `bg-cyan-300/20 flex items-center justify-center rounded-lg  font-bold  py-1 h-fit px-2 text-xs`,
        'text-cyan-300',
        isGreen && 'bg-green-300/20 text-green-300',
        isSmall ? 'scale-75' : '',
        isMedium ? 'text-[10px]' : ''
      )}
    >
      {children}
    </span>
  );
};

export default Pill;
