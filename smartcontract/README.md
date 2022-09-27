# Sample Hardhat Project

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```
npx hardhat compile
npx hardhat test
```

# Bscscan verification

To try out Bscscan verification, you first need to deploy a contract to an BSC network that's supported by Binance Smart Chain.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your BSC API key, your node URL and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```
npx hardhat run scripts/deploy.js --network <network-name>
npx hardhat verify --network bsctestnet <contract-address>
```

# Keep tracking network

To make the project easy to maintain as well switch between others network. We create file `config.json` to manage those code

We use **fs** library for helping this file. It always update after each deploy
