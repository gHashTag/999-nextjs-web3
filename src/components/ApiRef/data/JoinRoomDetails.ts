type IApiDataType = {
  title: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
};

export const JoinRoomTokenAPI: IApiDataType[] = [
  {
    title: 'roomId',
    type: 'string',
    required: true,
    description:
      'The RoomId of the room, for which you need to get the details.',
  },
  {
    title: 'displayName',
    type: 'string',
    required: true,
    description: 'The display name of the user, who is joining the room.',
  },
  {
    title: 'userType',
    type: "'host' | 'guest'",
    required: true,
    description:
      'The type of the user, who is joining the room. The possible values are host and guest.',
  },
  {
    title: 'guestAsHost',
    type: 'boolean',
    required: false,
    description: 'The anyone who first joins the room will be the host.',
  },
];

export const JoinRoomTokenResponse: IApiDataType[] = [
  {
    title: 'token',
    description:
      'The token, which is used to join the room. This token is valid for 30 mins.',
    required: true,
    type: 'string',
  },
  {
    title: 'hostUrl',
    description: 'The host url of the room.',
    required: false,
    type: 'string',
  },
  {
    title: 'redirectUrl',
    description: 'The redirect url of the room.',
    required: false,
    type: 'string',
  },
];
