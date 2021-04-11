const Ballot = artifacts.require("Ballot");

contract("Ballot", async (accounts, web3) => {
  it("Should construct", async () => {
    console.log("web3", web3);
  });
});
