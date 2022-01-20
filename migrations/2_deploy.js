// migrations/2_deploy.js
const SimpleToken = artifacts.require('ERC20');

module.exports = async function (deployer) {
  await deployer.deploy(SimpleToken);
  const token = await SimpleToken.deployed();

  await token.transfer(receiver.address, "1000");
};
