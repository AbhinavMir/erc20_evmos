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
  const owner = accounts[0];
  const recipient = accounts[1];

  before(async function () {
    this.token = await ERC20.deployed();
  });

  it("Checks new deployed contract", async function () {
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

  it("Should mint 50 EGMS tokens to caller", async function () {
    expectEvent(await this.token.mint(50, { from : owner }), "mintAmount");
  });

  it("Should fail upon minting more than 100 EGMS", async function () {
    await expectRevert(
      this.token.mint(101, { from: owner }),
      "Amt must be < 100");
  });
});

