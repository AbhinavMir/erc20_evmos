## EGGMOS

### Instructions to deploy

```
ganache-cli -p 8545
truffle deploy
```

### Instructions to test

```
truffle test
```

### Introduction

This is a "meme"-coin of sorts? 
- Just an ERC20 token with uncapped mints. 
- I tried to set up an EVMOS node, but it didn't exactly workout. To not waste anymore time, I just used a public RPC. Will probably write a blog about this.
- Deployed on EVMOS Testnet (https://chainlist.org/) 
- Add `0xe3fFAA89E058E916182e3A0e986DEE45cED77A6e` as contract to your Metamask. Once done, you're good to go. 
- Now visit the faucet (https://evmoserc20test.netlify.app/) and mint 50 EGMS. 
- You can transfer between accounts using your metamask or the frontend given above.
- To do the same via Golang, you can try the following in root `go run go-client/application/transferEGMS.go`
- This might give you a few errors - still in development.
- For testing, I added a simple test via Truffle and OpenZeppelin test helpers. Running `truffle test` in root should give you an idea.
- The real fun is in Fuzz testing - which I'm implementing via GoLang.

### Project Structure

```

├── contracts // Core Contract
│   └── ERC20.sol
├── go-client // A Go client for the application - instructions in directory readme
│   ├── README.md
│   ├── abigen
│   ├── application
│   ├── go.mod
│   ├── go.sum
│   └── tests
├── js-client // A React-based client for the application (transfer + faucet)
│   ├── README.md
│   ├── build
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
├── migrations // Truffle migration files
│   └── 1_initial_migration.js
├── test       // A few unit tests for the contract
│   └── erc20.test.js
```

### Test coverage
(via Solidity-coverage)

```
------------|----------|----------|----------|----------|----------------|
File        |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
------------|----------|----------|----------|----------|----------------|
 contracts/ |      100 |      100 |      100 |      100 |                |
  ERC20.sol |      100 |      100 |      100 |      100 |                |
------------|----------|----------|----------|----------|----------------|
All files   |      100 |      100 |      100 |      100 |                |
------------|----------|----------|----------|----------|----------------|
```