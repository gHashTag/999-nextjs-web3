import React from 'react';

import ApiRefTable from './ApiRefTable';
import { CreateRoomResponse as ResponseData } from './data/CreateRoomData';

type IApiResponseType = {
  title: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
};

interface Props {
  data: IApiResponseType[];
}

const CreateRoomResponse: React.FC<Props> = ({ data = ResponseData }) => {
  const values = data.map(item => {
    return [item.title, item.description, item.type];
  });

  return (
    <ApiRefTable
      headers={['Fields', 'Definition', 'Data Type']}
      options={values}
    />
  );
};

export default CreateRoomResponse;
