const Airlines = artifacts.require("Airlines");

module.exports = function (deployer) {
  deployer.deploy(Airlines);
};
