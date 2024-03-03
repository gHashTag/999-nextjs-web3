import React from 'react';

type VersionPillProps = {
  version: string;
};

const VersionPill: React.FC<VersionPillProps> = ({ version }) => (
  <div className="bg-rgb-11 py-0.5 px-2 text-rgb-12 text-xs font-medium rounded-2xl">
    {version}
  </div>
);
export default React.memo(VersionPill);
