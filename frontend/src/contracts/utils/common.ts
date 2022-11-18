export type AddressType = {
  97: string
  56: string
}

export enum CHAIN_ID {
  TESTNET = 97,
  MAINNET = 56,
}

export default function getChainIdFromEnv(): number {
  const env = process.env.NEXT_PUBLIC_CHAIN_ID
  if (!env) {
    return 97
  }
  return parseInt(env)
}

export const getRPC = () => {
  if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
    return process.env.NEXT_PUBLIC_RPC_MAINNET
  return process.env.NEXT_PUBLIC_RPC_TESTNET
}

export const SMART_ADDRESS = {
  CROWD_SALE: { 97: '0xae33AB100B084767ea5c5b1f14BBE81CD37bE162', 56: '' },
  USDT: { 97: '0x2714b22A6C78C15929b281189DA2Ef008c0b3617', 56: '' },
}
