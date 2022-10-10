import { ethers, hardhatArguments } from 'hardhat'
import * as Config from './config'

async function main() {
  await Config.initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'
  const [deployer] = await ethers.getSigners()
  console.log('deploy from address: ', deployer.address)

  // const Crown = await ethers.getContractFactory('Crown')
  // const crown = await Crown.deploy()
  // console.log('Crown deployed to: ', crown.address)
  // Config.setConfig(network + '.Crown', crown.address)

  // const Vault = await ethers.getContractFactory('Vault')
  // const vault = await Vault.deploy()
  // console.log('Vault deployed to: ', vault.address)
  // Config.setConfig(network + '.Vault', vault.address)

  // const USDT = await ethers.getContractFactory('USDT')
  // const usdt = await USDT.deploy()
  // console.log('USDT deployed to: ', usdt.address)
  // Config.setConfig(network + '.USDT', usdt.address)

  const Ico = await ethers.getContractFactory('CRNCrowdSale')
  const ico = await Ico.deploy(
    1000,
    100,
    '0x8C025238aAf9241060422ed1e4DfB2bD45fACD5F',
    '0xfee6D906294801e70E4a22ECE28DdcCD0A495166'
  )
  console.log('ICO address: ', ico.address)
  Config.setConfig(network + '.ico', ico.address)

  await Config.updateConfig()
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
