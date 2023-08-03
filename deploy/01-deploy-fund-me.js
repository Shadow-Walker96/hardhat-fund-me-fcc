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
// 10:14:51 --> Mocking & helper-hardhat-config, i just splitted it jare
// instead of hardcoding our address from the oracle chain-link, we can use aave protocol to work with multiple different chains and addresses
// like for example, we can expand the functionality of our chainId like below

// if chainId is X use address Y
// if chainId is Z use address A

// we created a file called helper-hardhat-config.js
// we import const { networkConfig } = requires("../helper-hardhat-config.js")

const { networkConfig } = requires("../helper-hardhat-config.js")
const { network } = require("hardhat")

module.exports = async( { getNamedAccounts, deployments } ) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const ethUsdPriceFeedAddress =networkConfig[chainId]["ethUsdPriceFeed"]

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
        args: [address], 
        log: true,
    })
}