import React from 'react';

interface Props {
  method: string;
  url: string;
  endpoint: string;
}

const RequestStrip: React.FC<Props> = ({ method, url, endpoint }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="bg-[#126EA5] font-bold text-sm p-2 rounded-lg shadow-md">
        {method}
      </span>
      <p className="text-slate-400 font-inter flex-nowrap select-all cursor-default">
        {url}/
        <span className="text-white md:text-base text-xs">{endpoint}</span>
      </p>
    </div>
  );
};

export default RequestStrip;
