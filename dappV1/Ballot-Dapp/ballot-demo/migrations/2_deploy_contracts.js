const FactoryBallot = artifacts.require("FactoryBallot");

module.exports = function (dpeloyer) {
  dpeloyer.deploy(FactoryBallot);
};
