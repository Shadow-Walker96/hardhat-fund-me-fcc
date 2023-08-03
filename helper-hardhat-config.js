
/*
// // 10:14:51 --> Mocking & helper-hardhat-config, i just splitted it jare
// const networkConfig = {
//     // 11155111 --> chainid for sepolia 
//     11155111: {
//         name: "sepolia",
//         ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306" // price feed address from chain-link
//     },
// }

// // we dont want to deploy our contract to a network that already has a pricefeed it 
// // we create an array to choose from
// const developmentChains = ["hardhat", "localhost"]

// // The args in our 00-deploy-mocks.js is from `MockV3Aggregator.sol` file which we can find in our node_modules
// // we would see that the constructor has two parameters `uint8 _decimals, int256 _initialAnswer`
// // we can keep the parameter in a variable here 

// const DECIMALS = 8
// const INITIAL_ANSWER = 183600000000

// module.exports = {
//     networkConfig,
//     developmentChains,
//     DECIMALS,
//     INITIAL_ANSWER
// }

*/

// Mocking & helper-hardhat-config, this is everything without the comments
const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306" 
    },
}

const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 183600000000

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER
}