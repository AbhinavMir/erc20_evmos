const { constants } = require("@openzeppelin/test-helpers")
const ERC20 = artifacts.require("ERC20");

contract('ERC20', (accounts) => {
    beforeEach(async () => {
      `let erc20Instance = await ERC20.new();`
    })
  
    it('ERC20 should work', async () => {
        await expectRevert(
            erc20Instance.transfer(constants.ZERO_ADDRESS, 42, { from: accounts[1] }),
            'ERC20: transfer to the zero address'
        )
    })
  })
