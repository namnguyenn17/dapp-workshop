import { ethers, hardhatArguments } from 'hardhat'
import * as Config from './config'

async function main() {
  await Config.initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'
  const [deployer] = await ethers.getSigners()
  console.log('deploy from address: ', deployer.address)

  // const Crown = await ethers.getContractFactory('CrownToken')
  // const crown = await Crown.deploy()
  // console.log('Crown deployed to: ', crown.address)
  // Config.setConfig(network + '.Crown', crown.address)

  // const Vault = await ethers.getContractFactory('CrownVault')
  // const vault = await Vault.deploy('0xd1A1105d14bfa100D0F49FCf9d45e49EAa484B32')
  // console.log('Crown Vault deployed to: ', vault.address)
  // Config.setConfig(network + '.CrownVault', vault.address)

  // const USDT = await ethers.getContractFactory('USDT')
  // const usdt = await USDT.deploy()
  // console.log('USDT deployed to: ', usdt.address)
  // Config.setConfig(network + '.USDT', usdt.address)

  const CrownCrowdSale = await ethers.getContractFactory('CrownCrowdSale')
  const crownCrowdSale = await CrownCrowdSale.deploy(
    1000,
    100,
    '0x8C025238aAf9241060422ed1e4DfB2bD45fACD5F',
    '0xd1A1105d14bfa100D0F49FCf9d45e49EAa484B32'
  )
  console.log('CrownCrowdSale address: ', crownCrowdSale.address)
  Config.setConfig(network + '.CrownCrowdSale', crownCrowdSale.address)

  await Config.updateConfig()
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
