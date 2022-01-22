// migrations/2_deploy.js
const SimpleToken = artifacts.require('EGGMOS');

module.exports = async function (deployer) {
  await deployer.deploy(SimpleToken);
  const token = await SimpleToken.deployed();

  await token.transfer("0x1f4186d627ED0fD3532470Ac8d681D3FEC2fbA11", "1000");
};
