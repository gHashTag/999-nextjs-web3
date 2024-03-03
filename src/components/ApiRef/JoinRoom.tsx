import React from 'react';

import ApiRefTable from './ApiRefTable';
import { CreateRoomAPI } from './data/CreateRoomData';

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

const CreateRoom: React.FC<Props> = ({ data = CreateRoomAPI }) => {
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
      headers={['Headers', 'Definition', 'Data Type', 'Mandatory']}
      options={values}
    />
  );
};

export default CreateRoom;
