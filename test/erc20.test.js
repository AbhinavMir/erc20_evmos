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

  before(async function () {
    this.token = await ERC20.deployed();
  });

  it("Checks new deployed contract", async function () {
    // const token = await ERC20.deployed();
    assert.ok(this.token.address);
  });

  it("should have the correct name and symbol", async function () {
    const name = await this.token.name();
    const symbol = await this.token.symbol();
    assert.equal(name, "EGGMOS");
    assert.equal(symbol, "EGMS");
  });

  it("should have 18 decimals", async function () {
    const decimals = await this.token.decimals();
    assert.equal(decimals, 18);
  });

  it("should be owned by the owner", async function () {
    const owner = await this.token.owner();
    assert.equal(owner, owner);
  });

  it("should transfer 100 tokens to a recipient", async function () {
    const balance_before = await this.token.balanceOf(recipient);
    await this.token.transfer(recipient, 100, { from: owner });
    const balance_after = await this.token.balanceOf(recipient);
    const grossBalance = balance_after - balance_before;
    assert.equal(grossBalance, 100);
  });

  it("should fail when trying to transfer more tokens than the sender has", async function () {
    await this.token.transfer(recipient, 50000, { from: owner });
  });

  it("should allow transferring all tokens to a recipient", async function () {
    await this.token.transfer(recipient, 1000, { from: owner });
    const senderBalance = await this.token.balanceOf(owner);
    assert.equal(senderBalance, 0);
    const recipientBalance = await this.token.balanceOf(recipient);
    assert.equal(recipientBalance, 1000);
  });

  it("mint tokens EGMS", async function () {
    const balance = await this.token.balanceOf(owner);
    await this.token.mint(owner, 10, { from: owner });
    const balanceAfter = await token.balanceOf(owner);
    assert.equal(balanceAfter, balance + 10);
  });
});

