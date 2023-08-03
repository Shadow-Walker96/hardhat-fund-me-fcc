
// 10:14:51 --> Mocking & helper-hardhat-config, i just splitted it jare
// Here we define our mocked price feed aggregator our self

// we dont have to start writing our own code for the pricefeed
// chainlink has a mocked file already on github we can use

// after the import we now run --> yarn hardhat compile
// we run into an issue of solidity version which we would fix 

// we fix in it our hardhat.config.js file 
// solidity: { compilers: [ {version: "0.8.8"}, { version: "0.6.6"} ], }

// after that we run --> yarn hardhat compile 
// its works and shows Compiled 6 Solidity files successfully

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

// We use our node_modules to our advantage bcos we dont need to copy the code for MockV3Aggregator.sol from github
import "@chainlink/contracts/src/v0.6/tests/MockV3Aggregator.sol";
