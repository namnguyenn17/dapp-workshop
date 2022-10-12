declare var window: any
import React from 'react'
import { Flex, Heading, Spacer } from '@chakra-ui/react'
import { ConnectWallet, WalletInfo } from '../../components'
import { IWalletInfo } from '../../_types_'
import { ethers } from 'ethers'

export default function InvestView() {
  const [wallet, setWallet] = React.useState<IWalletInfo>()
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
    </Flex>
  )
}
