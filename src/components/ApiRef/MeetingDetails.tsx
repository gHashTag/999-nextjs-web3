import React from 'react';

import ApiRefTable from './ApiRefTable';
import { MeetingDetailsAPI } from './data/MeetingDetails';

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

const MeetingDetails: React.FC<Props> = ({ data = MeetingDetailsAPI }) => {
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

export default MeetingDetails;
