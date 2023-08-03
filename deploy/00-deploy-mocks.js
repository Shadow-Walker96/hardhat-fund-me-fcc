
/*
// 10:14:51 --> Mocking & helper-hardhat-config, i just splitted it jare
// we want to deploy our own mocks to hardhat network since it dosent have a contract that has price feed in it
// but we dont need to deploy mocks to sepolia and others bcos they already have price feeds in them

// since we are going do deploy our contract we have to create a folder in our contracts called mocks/test but we will choose test
// and a file called MockV3Aggregator.sol


const { network } = require("hardhat")
const { developmentChains, DECIMALS, INITIAL_ANSWER } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    // we dont want to deploy our contract to a network that already has a pricefeed it 
    
    // we can write if like this if(chainId == 31337){...}
    if(developmentChains.includes(network.name)){
        log("Local network detected! Deploying mocks...") // it works like console.log()
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            // The args here is from `MockV3Aggregator.sol` file which we can find in our node_modules
            // we would see that the constructor has two parameters `uint8 _decimals, int256 _initialAnswer`
            // we can keep the parameter in a variable outside the file and we will keep it in our helper-hardhat-config.js
            args: [ DECIMALS, INITIAL_ANSWER ],
        })
        log("Mocks deployed!")
        log("--------------------------------------------------------")
    }

}

// we can run only our 00-deploy-mocks.js script by using tags

// so in the console we run --> yarn hardhat deploy --tags mocks
// which means it will only run only our mock script

// Bingo here is the result below

// Nothing to compile
// Local network detected! Deploying mocks...
// deploying "MockV3Aggregator" (tx: 0x712496f33ccbc8a51f6f8b5db572d0f3e4f8b3e4383c7c74e35c0c04e140ba4e)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 569635 gas
// Mocks deployed!
// --------------------------------------------------------
// Done in 2.32s.

module.exports.tags = ["all", "mocks"]

*/

// Mocking & helper-hardhat-config, this is everything without the comments

const { network } = require("hardhat")
const { developmentChains, DECIMALS, INITIAL_ANSWER } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    
    if(developmentChains.includes(network.name)){
        log("Local network detected! Deploying mocks...") 
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [ DECIMALS, INITIAL_ANSWER ],
        })
        log("Mocks deployed!")
        log("--------------------------------------------------------")
    }

}

module.exports.tags = ["all", "mocks"]