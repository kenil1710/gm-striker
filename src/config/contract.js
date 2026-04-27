export const GM_CONTRACT_ADDRESS = '0xA80e4964285E4f2074E378007353399df2FE1380';

export const GM_CONTRACT_ABI = [
  {
    name: 'sendGM',
    type: 'function',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    name: 'totalGMsSent',
    type: 'function',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    name: 'userGMCount',
    type: 'function',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
];
