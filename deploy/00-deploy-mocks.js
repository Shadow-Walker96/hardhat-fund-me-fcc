
// 10:14:51 --> Mocking & helper-hardhat-config, i just splitted it jare
// we want to deploy our own mocks to hardhat network since it dosent have a contract that has price feed in it
// but we dont need to deploy mocks to sepolia and others bcos they already have price feeds in them

// since we are going do deploy our contract we have to create a folder in our
// contracts folder when will be our mocked file in 
const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId


}
