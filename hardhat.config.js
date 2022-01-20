require("hardhat-contract-sizer");

// process.env.PRIVATE_KEY

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
      // accounts: [privateKey1],
      chainId: 9000,
    },
  },
};
