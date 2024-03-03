import { IApiDataType } from '../TokenGated';

export const CreateRoomAPI: IApiDataType[] = [
  {
    title: 'title',
    type: 'string',
    required: true,
    description:
      'The title of the room. This will be displayed in the room list.',
  },
  {
    title: 'description',
    type: 'string',
    required: false,
    description:
      'The description of the room. This will be displayed in the room list.',
  },
  {
    title: 'roomType',
    type: 'AUDIO | VIDEO',
    required: false,
    description:
      'AUDIO will be for Audio Spaces and VIDEO will be for normal meetings with Video and Audio both.',
  },
  {
    title: 'startTime',
    type: 'string (ISO 8601)',
    required: false,
    description:
      'The start time of the room. This will be displayed in the room list.',
  },
  {
    title: 'expiryTime',
    type: 'string (ISO 8601)',
    required: false,
    description:
      'The expiry time of the room. This will be displayed in the room list.',
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: 'hostWallets',
    type: 'string [ ]',
    required: false,
    description: 'The host wallets how who will have admin access to the room.',
  },
  {
    title: 'roomLocked',
    type: 'boolean',
    required: false,
    default: 'true',
    description:
      'The start time of the room. This will be displayed in the room list.',
  },
  {
    title: 'muteOnEntry',
    type: 'boolean',
    required: false,
    default: 'false',
    description: 'Every new peer who joins, must be muted',
  },
  {
    title: 'videoOnEntry',
    type: 'boolean',
    required: false,
    default: 'false',
    description: 'Every new peer who joins, must have their video turned off',
  },
];

export const CreateRoomResponse = [
  {
    title: 'message',
    type: 'string',
    required: true,
    description: 'The message returned from the server.',
    default: 'Room created successfully',
  },
  {
    title: 'roomId',
    type: 'string',
    required: true,
    description: 'The id of the room created.',
  },
];
