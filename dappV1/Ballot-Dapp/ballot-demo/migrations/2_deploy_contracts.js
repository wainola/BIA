const Ballot = artifacts.require("Ballot");

module.exports = function (dpeloyer) {
  dpeloyer.deploy(Ballot);
};
