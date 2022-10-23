declare let window: any

import React from 'react'
import { Flex, Heading, SimpleGrid, Spacer } from '@chakra-ui/react'
import { ConnectWallet, WalletInfo } from '../../components'
import { IPackage, IRate, IWalletInfo, TOKEN } from '../../_types_'
import { ethers } from 'ethers'
import InvestCard from './components/InvestCard'
import { packages } from '../../constants'

export default function InvestView() {
  const [wallet, setWallet] = React.useState<IWalletInfo>()
  const [rate, setRate] = React.useState<IRate>({ bnbRate: 0, usdtRate: 0 })
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false)
  const [pak, setPak] = React.useState<IPackage>()

  const [Web3Provider, setWeb3Provider] =
    React.useState<ethers.providers.Web3Provider>()

  const onConnectMetamask = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        undefined
      )
      await provider.send('eth_requestAccounts', []) // request account access if needed
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      const bigBalance = await signer.getBalance()
      const bnbBalance = ethers.utils.formatEther(bigBalance)

      setWallet({ address, bnb: Number(bnbBalance) })
      setWeb3Provider(provider)
    }
  }

  const handleBuyIco = async () => {}

  return (
    <Flex
      w={{ base: 'full', lg: '70%' }}
      flexDirection="column"
      margin="50px auto"
    >
      <Flex>
        <Heading size="lg" fontWeight="bold">
          Blockchain Trainee
        </Heading>
        <Spacer />
        {!wallet && <ConnectWallet onClick={onConnectMetamask} />}
        {wallet && (
          <WalletInfo address={wallet?.address} amount={wallet?.bnb || 0} />
        )}
      </Flex>

      <SimpleGrid columns={{ base: 1, lg: 3 }} mt="50px" spacingY="20px">
        {packages.map((pk, index) => (
          <InvestCard
            pak={pk}
            key={String(index)}
            isBuying={isProcessing && pak?.key === pk.key}
            rate={pk.token === TOKEN.BNB ? rate.bnbRate : rate.usdtRate}
            walletInfo={wallet}
            onBuy={() => handleBuyIco()}
          />
        ))}
      </SimpleGrid>
    </Flex>
  )
}
