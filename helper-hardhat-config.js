// 10:14:51 --> Mocking & helper-hardhat-config, i just splitted it jare
const networkConfig = {
    // 11155111 --> chainid for sepolia 
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306" // price feed address from chain-link
    },
}

module.exports = {
    networkConfig,
}