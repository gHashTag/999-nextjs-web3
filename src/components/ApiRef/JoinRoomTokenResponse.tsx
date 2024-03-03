import React from 'react';

import ApiRefTable from './ApiRefTable';
import { JoinRoomTokenResponse as ResponseData } from './data/JoinRoomDetails';

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

const JoinRoomTokenResponse: React.FC<Props> = ({ data = ResponseData }) => {
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
      headers={['Fields', 'Definition', 'Data Type', 'Mandatory']}
      options={values}
    />
  );
};

export default JoinRoomTokenResponse;
