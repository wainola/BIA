const FactoryBallot = artifacts.require("FactoryBallot");

contract("FactoryBallot", async (accounts) => {
  it("should register voters and proposals", async () => {
    const instance = await FactoryBallot.deployed({ from: accounts[0] });

    const registered = accounts[1];

    instance.registerVoters(
      registered,
      "name 1",
      "lastname 1",
      "mail@emaail.com",
      { from: accounts[0] }
    );

    await instance.getInfoVoter(registered, {
      from: accounts[0],
    });

    await instance.setProposal("proposal 1", "description 1", {
      from: registered,
      value: web3.utils.toWei("1", "ether"),
    });

    const [propsalTitle] = await instance.getProposal(
      registered,
      "proposal 1",
      {
        from: registered,
      }
    );

    expect(propsalTitle).to.equal("proposal 1");
  });
});
