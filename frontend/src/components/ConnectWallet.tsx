import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'

interface IProps extends ButtonProps {}

export default function ConnectWallet({ ...props }: IProps) {
  return (
    <Button variant="primary" {...props}>
      Connect Wallet
    </Button>
  )
}
