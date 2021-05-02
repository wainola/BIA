const {
  BN,
  constants,
  expectEvent,
  expectRevert,
} = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

const MyTokenERC20Mock = artifacts.require("MyTokenERC20Mock");

contract("MyTokenERC20", function (accounts) {
  const [initialHolder, recipient, anotherAccount] = accounts;
  const name = "Wainola Token";
  const symbol = "WTKN";
  const initialSupply = new BN(100);

  beforeEach(async function () {
    this.token = await MyTokenERC20Mock.new(
      name,
      symbol,
      initialHolder,
      initialSupply
    );
  });

  it("has a name", async function () {
    expect(await this.token.name()).to.equal(name);
  });
  it("has a symbol", async function () {
    expect(await this.token.symbol()).to.equal(symbol);
  });

  describe("should behave like ERC20", function () {
    describe("total supply", function () {
      it("returns the total ammount of tokens", async function () {
        expect(await this.token.totalSupply()).to.be.bignumber.equal(
          initialSupply
        );
      });
    });
  });
});
