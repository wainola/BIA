const Ballot = artifacts.require("Ballot");

contract("Ballot", async (accounts) => {
  it("Should register", async () => {
    const instance = await Ballot.deployed();

    const registered = accounts[0];

    const {
      receipt: { status },
    } = await instance.register(registered);

    expect(status).to.be.true;
  });

  it("Should vote for proposals", async () => {
    const instance = await Ballot.deployed();

    const [r1, r2, r3, r4, r5] = accounts;

    const r = [];

    await instance.register(r1);
    await instance.register(r2);
    await instance.register(r3);
    await instance.register(r4);
    await instance.register(r5);

    await instance.vote(1, { from: r1 });
    await instance.vote(2, { from: r2 });
    await instance.vote(1, { from: r3 });
    await instance.vote(1, { from: r4 });
    await instance.vote(1, { from: r5 });

    const result = await instance.reqWinner();

    expect(result.words[0]).to.equal(1);
  });
});
