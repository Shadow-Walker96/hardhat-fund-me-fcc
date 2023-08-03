// 10:52:51 --> Utils Folder
// Here is the code to verify our contract on etherscan

const { run } = require("hardhat")

const verify = async(contractAddress, args) => {
    console.log("Verifying contract...");
    try {
       await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
       }) 
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");   
        } else {
            console.log(e);
        }
    }
}

module.exports = { verify }