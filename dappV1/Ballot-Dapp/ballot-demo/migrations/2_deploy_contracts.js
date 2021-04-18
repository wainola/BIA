const FactoryBallot = artifacts.require("FactoryBallot");

module.exports = function (dpeloyer, network, accounts) {
  const chairperson = accounts[0];
  console.log("ACCOUNT", chairperson);
  dpeloyer.deploy(FactoryBallot, { from: chairperson });
};
