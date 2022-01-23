module.exports = {

  plugins: 
  [
  "solidity-coverage",
  "truffle-plugin-solhint",
  "truffle-contract-size",
  ],
  

  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },

    EVMOS: {
      host: "https://ethereum.rpc.evmos.dev",
      network_id: 9000,
    },
  },

  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      excludeContracts: ['Migrations']
    },
  },

  compilers: {
    solc: {
      version: "0.8.10",
    },
  },
};
