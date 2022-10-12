import React from 'react'
import { Flex, Heading, Spacer } from '@chakra-ui/react'
import { ConnectWallet } from '../../components'

export default function InvestView() {
  const onConnectMetamask = async () => {
    console.log('connect metamask')
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
        <ConnectWallet onClick={onConnectMetamask} />
      </Flex>
    </Flex>
  )
}
