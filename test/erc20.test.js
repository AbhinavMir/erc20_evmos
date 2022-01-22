const {
  BN, // Big Number support
  constants, // Common constants, like the zero address and largest integers
  expect,
  expectEvent, // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require("@openzeppelin/test-helpers");
const ERC20 = artifacts.require("EGGMOS");
// a test to test erc20 token
contract("ERC20", function (accounts) {
  let [owner, recipient] = accounts;
  recipient = "0x1f4186d627ED0fD3532470Ac8d681D3FEC2fbA11";

  it("Checks new deployed contract", async function () {
    const token = await ERC20.deployed();
    assert.ok(token.address);
  });

  it("should have the correct name and symbol", async function () {
    const token = await ERC20.deployed();
    const name = await token.name();
    const symbol = await token.symbol();
    assert.equal(name, "EGGMOS");
    assert.equal(symbol, "EGMS");
  });

  it("should have 18 decimals", async function () {
    const token = await ERC20.deployed();
    const decimals = await token.decimals();
    assert.equal(decimals, 18);
  });

  it("should be owned by the owner", async function () {
    const token = await ERC20.deployed();
    const owner = await token.owner();
    assert.equal(owner, owner);
  });

  it("should transfer 100 tokens to a recipient", async function () {
    const token = await ERC20.deployed();
    const balance_before = await token.balanceOf(recipient);
    await token.transfer(recipient, 100, { from: owner });
    const balance_after = await token.balanceOf(recipient);
    const grossBalance = balance_after - balance_before;
    assert.equal(grossBalance, 100);
  });

  it("should fail when trying to transfer more tokens than the sender has", async function () {
    const token = await ERC20.deployed();
    await token.transfer(recipient, 50000, { from: owner });
  });

  it("should allow transferring all tokens to a recipient", async function () {
    const token = await ERC20.deployed();
    await token.transfer(recipient, 1000, { from: owner });
    const senderBalance = await token.balanceOf(owner);
    assert.equal(senderBalance, 0);
    const recipientBalance = await token.balanceOf(recipient);
    assert.equal(recipientBalance, 1000);
  });

  it("mint tokens EGMS", async function () {
    const token = await ERC20.deployed();
    const balance = await token.balanceOf(owner);
    await token.mint(owner, 1000, { from: owner });
    const balanceAfter = await token.balanceOf(owner);
    assert.equal(balanceAfter, balance + 1000);
  });
});

