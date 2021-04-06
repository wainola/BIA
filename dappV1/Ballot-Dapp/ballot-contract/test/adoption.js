const Adoption = artifacts.require("Adoption");

contract("Adoption", async (accounts) => {
  it("Should adopt a pet", async () => {
    const instance = await Adoption.deployed();
    const source = accounts[1];
    const {
      receipt: { from, status },
    } = await instance.adopt(1, { from: source });
    expect(status).to.be.true;
    expect(from).to.have.lengthOf(source.length);
  });
});
