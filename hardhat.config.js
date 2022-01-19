require("hardhat-contract-sizer");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const privateKey1 = "";

module.exports = {
  solidity: "0.8.4",
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  defaultNetwork: "local",
  networks: {
    local: {
      url: "http://localhost:8545/",
      accounts: [privateKey1],
      chainId: 9000,
    },
  },
};
