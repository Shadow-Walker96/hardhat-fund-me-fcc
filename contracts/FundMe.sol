/*
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    mapping(address => uint256) public addressToAmountFunded;
    address[] public funders;

    // Could we make this constant?  /* hint: no! We should make it immutable! */
    // address public /* immutable */ i_owner;
    // uint256 public constant MINIMUM_USD = 50 * 10 ** 18;
    
    // constructor() {
    //     i_owner = msg.sender;
    // }

    // function fund() public payable {
    //     require(msg.value.getConversionRate() >= MINIMUM_USD, "You need to spend more ETH!");
    //     // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
    //     addressToAmountFunded[msg.sender] += msg.value;
    //     funders.push(msg.sender);
    // }
    
    // function getVersion() public view returns (uint256){
    //     // ETH/USD price feed address of Sepolia Network.
    //     AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    //     return priceFeed.version();
    // }
    
    // modifier onlyOwner {
    //     // require(msg.sender == owner);
    //     if (msg.sender != i_owner) revert NotOwner();
    //     _;
    // }
    
    // function withdraw() public onlyOwner {
    //     for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
    //         address funder = funders[funderIndex];
    //         addressToAmountFunded[funder] = 0;
    //     }
    //     funders = new address[](0);
        // // transfer
        // payable(msg.sender).transfer(address(this).balance);
        // // send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");
        // call
    //     (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
    //     require(callSuccess, "Call failed");
    // }
    // Explainer from: https://solidity-by-example.org/fallback/
    // Ether is sent to contract
    //      is msg.data empty?
    //          /   \ 
    //         yes  no
    //         /     \
    //    receive()?  fallback() 
    //     /   \ 
    //   yes   no
    //  /        \
    //receive()  fallback()

//     fallback() external payable {
//         fund();
//     }

//     receive() external payable {
//         fund();
//     }

// }
// */

// Concepts we didn't cover yet (will cover in later sections)
// 1. Enum
// 2. Events
// 3. Try / Catch
// 4. Function Selector
// 5. abi.encode / decode
// 6. Hash with keccak256
// 7. Yul / Assembly

// */


// 10:21:05 --> Mocking & helper-hardhat-config

// We want to make changes to our contract
// when we want to deploy our script in localhost, we want to make use of a mock
// and when we want to change chains i.e avalance, sepolia, BNB, ethereum, polygon in chainlink-datafeed
// and we need keep in mind that different chians have different pricefeeds but still the similar functionality, because if we check
// the address for ETH/USD for ethereum mainnet, is different from the address for ETH/USD for sepolia and others

// so we want to modularise/primariatized this address `AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);`
// so that in different chains, we dont have to change any of our code

// we would make few changes or refactor to our codes in this fundme.sol file

// 1. We refactor our constructor function to hold our priceFeed address
// 2. we created a variable with type AggregatorV3Interface
// 3. we want to use our pricefeed variable in our price converter file
// 4. in the fund() we added a second parameter `priceFeed`
// 5. we remove getVersion() since we dont need it for now


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    mapping(address => uint256) public addressToAmountFunded;
    address[] public funders;

    // Could we make this constant?  /* hint: no! We should make it immutable! */
    address public /* immutable */ i_owner;
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;

    AggregatorV3Interface public priceFeed;
    
    // we want our constructor to have a parameter for our pricefeed
    // so when we deploy our contract if keeps the price feed on anychain we are on i.e sepolia, avalanche, BNB
    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }
    
    modifier onlyOwner {
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }
    
    function withdraw() public onlyOwner {
        for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);
    
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

}




