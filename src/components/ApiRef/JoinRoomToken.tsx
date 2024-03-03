import React from 'react';

import ApiRefTable from './ApiRefTable';
import { JoinRoomTokenAPI } from './data/JoinRoomDetails';

type IApiDataType = {
  title: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
};

interface Props {
  data: IApiDataType[];
}

const JoinRoomToken: React.FC<Props> = ({ data = JoinRoomTokenAPI }) => {
  const values = data.map(item => {
    return [
      item.title,
      item.description,
      item.type,
      item.required ? 'Y' : item.default ? item.default : 'N',
    ];
  });

  return (
    <ApiRefTable
      headers={['Params', 'Definition', 'Data Type', 'Mandatory']}
      options={values}
    />
  );
};

export default JoinRoomToken;
