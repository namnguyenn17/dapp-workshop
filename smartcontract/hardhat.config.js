require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: '0.8.9',
  networks: {
    bsctestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
}
