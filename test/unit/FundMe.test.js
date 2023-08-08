// 11:08:36 --> Testing FundMe

/*
const { deployments, ethers, getNamedAccounts } = require("hardhat")
// we want to write unit test for our contract

describe("FundMe", async function () {
    let fundMe
    // Here it will first deploy our contract
    beforeEach(async function () {
        // deploy our fundMe 
        // contract using hardhat-deploy

        const { deployer } = await getNamedAccounts() 
        await deployments.fixture(["all"]) // .fixture means we can deploy script with the specific tags
        fundMe = await ethers.getContract("FundMe", deployer) // .getContract get the most recent deployment contract
    })

    // We want to write test for our constructor
    describe("constructor", async function () {})
    
})

*/

// 11:08:36 --> Testing FundMe, i just splitted it 1.

// Here we create a variable for deployer and extract it differently
// we create a variable for mockV3Aggregator

const { assert } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer
        )
    })

    // We want to write test for our constructor
    describe("constructor", async function () {
        it("sets the aggregator addressed correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })
})
