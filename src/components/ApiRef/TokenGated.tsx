import React from 'react';

import ApiRefTable from './ApiRefTable';
import { TokenGatedRoomAPI } from './data/TokenGatedRoomData';

export type IApiDataType = {
  id?: number;
  title: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
  validValues?: string;
};

const TokenGated: React.FC = () => {
  const tokenValues = TokenGatedRoomAPI.map((item) => {
    return [
      item.title,
      item.description,
      item.type,
      item.validValues ? item.validValues : 'N/A',
    ];
  });

  return (
    <ApiRefTable
      headers={['Params', 'Definition', 'Data Type', 'Options']}
      options={tokenValues}
    />
  );
};

export default TokenGated;
