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
- Add `0x6aDdAd1d834D015E7eD839A15F586def146d2d2A` as contract to your Metamask. Once done, you're good to go. 
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

### Technical Decisions taken

- Using Truffle instead of Hardhat: This was mainly due to convenience. I had already spent a decent amount of time learning Go and then building the GUI in React, I chose the path of least resistence and built via Truffle. I've used Hardhat at work, but I've used Truffle frequently, thus the choice. 
- Using OpenZeppelin's ERC20 contract - I didn't want to reinvent the wheel for diminishing returns, and felt this was the best way to go about things.
- Deploying via RPC: The local testnet node wouldn't process the trasactions in a few instances, so shifted to using the RPC instead

### What more would I have done 

- Properly configuring CircleCI - I'm new to using CI/CD in Solidity, have to fill in some knowledge gaps.
- Wrote Table Driven Tests - GoLang is still shabby, I would've preffered to write the tests in GoLang and use Table Driven Tests.
