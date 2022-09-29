import { ethers, hardhatArguments } from 'hardhat'
import * as Config from './config'

async function main() {
  await Config.initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'
  const [deployer] = await ethers.getSigners()
  console.log('deploy from address: ', deployer.address)

  const Crown = await ethers.getContractFactory('Crown')
  const crown = await Crown.deploy()
  console.log('Crown deployed to: ', crown.address)
  Config.setConfig(network + '.Crown', crown.address)

  const Vault = await ethers.getContractFactory('Vault')
  const vault = await Vault.deploy()
  console.log('Vault deployed to: ', vault.address)
  Config.setConfig(network + '.Vault', vault.address)

  await Config.updateConfig()
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
