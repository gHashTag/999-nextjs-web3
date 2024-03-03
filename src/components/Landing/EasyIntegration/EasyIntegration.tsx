import React, { useState } from 'react';

import SdkTabs from '@components/common/SdkTabs/SdkTabs';

import ApiRefrence from './ApiRefrence';
import CliTool from './CliTool';
import Iframe from './Iframe';

const EasyIntegration = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = ['iFrame', 'CLI Tool', 'API Reference'];

  const tabData: Record<number, JSX.Element> = {
    1: <Iframe />,
    2: <CliTool />,
    3: <ApiRefrence />,
  };

  return (
    <div className="mt-4 overflow-y-hidden">
      <SdkTabs
        className="my-6"
        styles="gap-10 text-base"
        tabsHeader={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {tabData[activeTab]}
    </div>
  );
};

export default EasyIntegration;
