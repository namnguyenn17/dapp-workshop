export interface IWalletInfo {
  address: string
  bnb: number
}

export interface IRate {
  usdtRate: number
  bnbRate: number
}

export enum TOKEN {
  BNB = 'BNB',
  USDT = 'USDT',
}

export interface IPackage {
  key: string
  name: string
  amount: number
  icon: string
  bg: string
  token: TOKEN
}

export interface IMenu {
  name: string
  url: string
}
