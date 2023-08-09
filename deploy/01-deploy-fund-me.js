/*
// 10:14:51 --> Hardhat Deploy

// Writing scripts in hardhat-deploy is a way different bcos we dont need the `main()` and we dont need to
// call our main function i.e `main()`, but we still import packages

// function deployFunc(){
    // we just want to test our hardhat-deploy
    // console.log("hi")

    // when i run --> yarn hardhat compile, i ran into this issue below
    // Error HH801: Plugin hardhat-deploy-ethers requires the following dependencies to be installed: @nomicfoundation/hardhat-ethers.
// Please run: npm install --save-dev "@nomicfoundation/hardhat-ethers@^3.0.2"

// so i installed what the compilier told me to --> yarn add --dev @nomicfoundation/hardhat-ethers@^3.0.2

// After that i run --> yarn hardhat compile
// it works 
//  output in the shell is below 
//  Compiled 3 Solidity files successfully
// hi
// }

// module.exports.default = deployFunc
// hardhat deploy will call it

//  we can write our script a little bit different as written in the documentation

// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre
//  still the same as hre.getNamedAccount()
// }

// we can do it like this also
module.exports = async( { getNamedAccounts, deployments } ) => {
    const { deploy, log } = deployments

    // getNamedAccount is just a way to know the account that calls the scripts
    // bcos we can have more than one accounts i.e private keys

    // we added namedAccounts in hardhat.config.js
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
}

*/

/*
// 10:14:51 --> Mocking & helper-hardhat-config
// when going for localhost which is hardhat network we want to use a mock i.e like when we want to 
// interact with our price feed contact i.e `AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);`

// after refactoring our FundMe.sol and PriceConverter.sol file 

const { network } = require("hardhat")
module.exports = async( { getNamedAccounts, deployments } ) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const address = "0x694AA1769357215DE4FAC081bf1f309aDC325306"

    // remember that before we need contractFactory, but we dont need it anymore
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [address], // put price feed address
        log: true,
    })

    // we havent run our scripts yet
}

*/

/*

// 10:14:51 --> Mocking & helper-hardhat-config, i just splitted it jare
// instead of hardcoding our address from the oracle chain-link, we can use aave protocol to work with multiple different chains and addresses
// like for example, we can expand the functionality of our chainId like below

// if chainId is X use address Y
// if chainId is Z use address A

// we created a file called helper-hardhat-config.js
// we import const { networkConfig } = requires("../helper-hardhat-config.js")

const { networkConfig, developmentChains } = require("../helper-hardhat-config.js")
const { network } = require("hardhat")

module.exports = async( { getNamedAccounts, deployments } ) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // const ethUsdPriceFeedAddress =networkConfig[chainId]["ethUsdPriceFeed"] instead of creating a variable that stores the price feed in ethUsdPriceFeedAddress like this
    // we can do this instead 
    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        // we use the get method i.e `.get("MockV3Aggregator")` to get the most recent deployment
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress =networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // Now we want to mock since our local network doesnt have a price feed that exist
    // so if the contract dosent exist, we deploy a minimal version of
    //  for our local testing

    // so deploying mocks is technically deploying scripts 
    // se we would create a new file in our deploy folder called `00-deploy-mocks.js`

    // so we want to deploy our own mocks to hardhat network using `00-deploy-mocks.js` since it dosent 
    // have a contract that has price feed in it
    // but we dont need to deploy mocks to sepolia and others bcos they already have price feeds in them

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], 
        log: true,
    })
    log("-----------------------------------------------------")
}

// Now when we run --> yarn hardhat deploy or yarn hardhat deploy --network sepolia 
// Here is the result below 

// Nothing to compile
// Local network detected! Deploying mocks...
// deploying "MockV3Aggregator" (tx: 0x712496f33ccbc8a51f6f8b5db572d0f3e4f8b3e4383c7c74e35c0c04e140ba4e)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 569635 gas
// Mocks deployed!
// --------------------------------------------------------
// deploying "FundMe" (tx: 0x472a7e2ff90516edb5d50a22f3e376169a823e0370f1d46b03e23a85440651c9)...: deployed at 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 with 901264 gas
// -----------------------------------------------------
// Done in 2.43s.

// now when we run --> yarn hardhat node,  hardhat will run throught all of our deploy script and add it to the node

module.exports.tags = ["all", "fundme"]

*/

/*

// Mocking & helper-hardhat-config, everything without the comments

const { networkConfig, developmentChains } = require("../helper-hardhat-config.js")
const { network } = require("hardhat")

module.exports = async( { getNamedAccounts, deployments } ) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], 
        log: true,
    })
    log("-----------------------------------------------------")

    // when we run --> yarn hardhat deploy 
    // it deploys all the scripts in the deploy folder i.e both 00-deploy-mocks.js and 01-deploy-fund-me.js
    // it displays 

    // Nothing to compile
    // Local network detected! Deploying mocks...
    // deploying "MockV3Aggregator" (tx: 0x712496f33ccbc8a51f6f8b5db572d0f3e4f8b3e4383c7c74e35c0c04e140ba4e)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 569635 gas
    // Mocks deployed!
    // --------------------------------------------------------
    // deploying "FundMe" (tx: 0x2400bba034db655fe903a8db23247219b219c0a7b0476a39106a7d278809b7cb)...: deployed at 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 with 877739 gas
    // -----------------------------------------------------
    // Done in 2.04s.
}

module.exports.tags = ["all", "fundme"]

*/

/*

// 10:52:51 --> Utils Folder
// we want to verify our contract first but not with a local network
// so we can create a folder called utils and a file verify.js, which will keep all our
// verification code i.e verify script
// we import our file from utils here 

const { networkConfig, developmentChains } = require("../helper-hardhat-config.js")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async( { getNamedAccounts, deployments } ) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress =networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // Here we just created a variable to keep our ethUsdPriceFeedAddress
    const args = [ethUsdPriceFeedAddress]

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, 
        log: true,
    })
    
    // To verify our contract on etherscan
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {

    } else {
        await verify(fundMe.address, args)
    }

    log("----------------------------------------------------------------")

    // we have not deployed yet
}

module.exports.tags = ["all", "fundme"]

*/

/*

// 10:52:51 --> Testnet Demo
// Here we want to deploy it to sepolia test net
// So we make some changes in our hardhat.config.js file
// we added waitComfirmation 

const { networkConfig, developmentChains } = require("../helper-hardhat-config.js")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async( { getNamedAccounts, deployments } ) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress =networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const args = [ethUsdPriceFeedAddress]

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, 
        log: true,
        waitComfirmations: network.config.blockComfirmations || 1, // We added block confirmations for etherscan to get the contract deployed
    })
    
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {

    } {
        await verify(fundMe.address, args)
    }

    log("-----------------------------------------------------")

    // when we run --> yarn hardhat deploy --network sepolia or yarn hardhat deploy --network sepolia --tags fundme
    // it displays this 

    // Nothing to compile
    // reusing "FundMe" at 0x82131ee1146aE8BC63a57C326323B362783f133C
    // Verifying contract...
    // (node:49480) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
    // (Use `node --trace-warnings ...` to show where the warning was created)
    // Nothing to compile
    // Successfully submitted source code for contract
    // contracts/FundMe.sol:FundMe at 0x82131ee1146aE8BC63a57C326323B362783f133C
    // for verification on the block explorer. Waiting for verification result...

    // Successfully verified contract FundMe on Etherscan.
    // https://sepolia.etherscan.io/address/0x82131ee1146aE8BC63a57C326323B362783f133C#code
    // -----------------------------------------------------
    // Done in 9.00s.

}

module.exports.tags = ["all", "fundme"]

*/


// 10:52:51 --> Testnet Demo, this is the same Testnet Demo but without comment

const { networkConfig, developmentChains } = require("../helper-hardhat-config.js")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async( { getNamedAccounts, deployments } ) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress =networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const args = [ethUsdPriceFeedAddress]

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, 
        log: true,
        waitComfirmations: network.config.blockComfirmations || 1, 
    })
    
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {

    } {
        await verify(fundMe.address, args)
    }

    log("-----------------------------------------------------")

}

module.exports.tags = ["all", "fundme"]

