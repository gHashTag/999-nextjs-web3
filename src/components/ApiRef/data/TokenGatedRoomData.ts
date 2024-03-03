export const TokenGatedRoomAPI = [
  {
    title: 'tokenType',
    type: 'string',
    required: true,
    description: 'Type of token used for the room.',
    validValues:
      'ERC20, ERC721, ERC1155, BEP20, BEP721, BEP1155, LENS, POAP, CYBERCONNECT, COSMOS, TEZOS, SPL',
  },
  {
    title: 'chain',
    type: 'string',
    required: true,
    description: 'Chain the token is on.',
    validValues:
      'ETHEREUM, COSMOS, SOLANA, TEZOS, POLYGON, BSC, ARBITRUM, GOERLI',
  },
  {
    title: 'contractAddress',
    type: 'string[]',
    required: true,
    description: 'Contract address of the token.',
  },
  {
    title: 'conditionType',
    type: 'string',
    required: false,
    description:
      'Type of condition to be used for the room for LENS and CYBERCONNECT',
    validValues: 'COLLECT_POST, FOLLOW_HANDLE, HAVE_HANDLE, MIRROR_POST',
  },
  {
    title: 'conditionValue',
    type: 'string',
    required: false,
    description:
      'Condition type value for Lens and Cyberconnect,TokenId for ERC 1155 Tokens',
    validValues: 'TokenId for ERC1155,',
  },
];
