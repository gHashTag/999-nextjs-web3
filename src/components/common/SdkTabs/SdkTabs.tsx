import React from 'react';

// UI Primitive
import * as RadixTabs from '@radix-ui/react-tabs';

import { cn } from '../../../helpers/utils';

interface Props {
  activeTab: number;
  styles?: string;
  className?: string;
  tabsHeader: Array<string>;
  setActiveTab: (activeTab: number) => void;
}

const SdkTabs: React.FC<Props> = ({
  tabsHeader,
  activeTab,
  setActiveTab,
  className,
  styles,
}) => (
  <RadixTabs.Root
    defaultValue={`tab-${activeTab.toString()}`}
    className={cn('w-full border-b border-border', className)}
  >
    <RadixTabs.TabsList className={cn('flex items-center', styles)}>
      {tabsHeader.map((tab, i) => {
        if (tab) {
          return (
            <RadixTabs.TabsTrigger
              value={`tab-${i + 1}`}
              key={`tabs-toggle-${i + 1}`}
              onClick={() => setActiveTab(i + 1)}
              className={cn(
                'transition-all duration-300 ease-out pb-2 font-medium',
                activeTab === i + 1
                  ? 'border-b-2 text-[#246bfd] border-[#246bfd]'
                  : 'border-transparent  border-b-2'
              )}
            >
              {tab}
            </RadixTabs.TabsTrigger>
          );
        }

        return null;
      })}
    </RadixTabs.TabsList>
  </RadixTabs.Root>
);

export default React.memo(SdkTabs);
