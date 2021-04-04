const Ballot = artifacts.require("Ballot");

module.exports = function (deployer) {
  deployer.deploy(Ballot, 4); //send with 4 proposals
};
