/*
require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.8",
//   networks: {
//     ropsten: {
//       url: process.env.ROPSTEN_URL || "",
//       accounts:
//         process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
//     },
//   },
//   gasReporter: {
//     enabled: process.env.REPORT_GAS !== undefined,
//     currency: "USD",
//   },
//   etherscan: {
//     apiKey: process.env.ETHERSCAN_API_KEY,
//   },
// };

// */

/*
// 10:10:42 --> Hardhat Deploy
// This hardhat-deploy adds a mechanism to deploy contracts to any network, keeping track of them 
// and replicating the same environment for testing.

// and we added namedAccounts in module.export, to keep track of our deployer 

require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require('hardhat-deploy');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.8",
//   networks: {
//     ropsten: {
//       url: process.env.ROPSTEN_URL || "",
//       accounts:
//         process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
//     },
//   },
//   gasReporter: {
//     enabled: process.env.REPORT_GAS !== undefined,
//     currency: "USD",
//   },
//   etherscan: {
//     apiKey: process.env.ETHERSCAN_API_KEY,
//   },
//   namedAccounts: {
//     deployer: {
//       // so by default we set the zero index as the deployer
//       default: 0,
//     },
//     // we can create multiple user, let say if we want to run some test or something
//     users: {
//       default: 1
//     }
//   }
// };

// */

/*
// 10:14:51 --> Mocking & helper-hardhat-config
// we added defaultNetwork: "hardhat", which if we dont add it, it is added by behind the scene

require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require('hardhat-deploy');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.8",
//   defaultNetwork: "hardhat",
//   networks: {
//     ropsten: {
//       url: process.env.ROPSTEN_URL || "",
//       accounts:
//         process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
//     },
//   },
//   gasReporter: {
//     enabled: process.env.REPORT_GAS !== undefined,
//     currency: "USD",
//   },
//   etherscan: {
//     apiKey: process.env.ETHERSCAN_API_KEY,
//   },
//   namedAccounts: {
//     deployer: {
//       default: 0,
//     },
//     users: {
//       default: 1
//     }
//   }
// };

// */

/*
// 10:14:51 --> Mocking & helper-hardhat-config, i just splitted it jare
// we make changes here to support more solidity versions

require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require('hardhat-deploy');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   // solidity: "0.8.8",
//   solidity: {
//     compilers: [
//       {version: "0.8.8"},
//       { version: "0.6.6"}
//     ]
//   },
//   defaultNetwork: "hardhat",
//   networks: {
//     ropsten: {
//       url: process.env.ROPSTEN_URL || "",
//       accounts:
//         process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
//     },
//   },
//   gasReporter: {
//     enabled: process.env.REPORT_GAS !== undefined,
//     currency: "USD",
//   },
//   etherscan: {
//     apiKey: process.env.ETHERSCAN_API_KEY,
//   },
//   namedAccounts: {
//     deployer: {
//       default: 0,
//     },
//     users: {
//       default: 1
//     }
//   }
// };

// */

// 10:52:51 --> Testnet Demo
// we added blockComfirmations: 6 in our network session, just like in the previous lesson
// which will wait for etherscan to wait for the contract to be deployed

require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
// const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY

module.exports = {
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockComfirmations: 6, // We waited 6 block so that it can be confirmed on etherscan
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        // coinmarketcap: COINMARKET_API_KEY
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        users: {
            default: 1,
        },
    },
}
