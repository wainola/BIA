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

    describe("balanceOf", function () {
      describe("when the requested account has no tokens", function () {
        it("return zero", async function () {
          expect(
            await this.token.balanceOf(anotherAccount)
          ).to.be.bignumber.equal("0");
        });
      });

      describe("when the requested account has some tokens", function () {
        it("returns the total ammount of tokens", async function () {
          expect(
            await this.token.balanceOf(initialHolder)
          ).to.be.bignumber.equal(initialSupply);
        });
      });

      describe("transfer", function () {
        const transfer = function (from, to, value) {
          return this.token.transfer(to, value, { from });
        };
        describe("when the recipient is not the zero address", function () {
          describe("and the sender does not have enough balance", function () {
            const amount = initialSupply.addn(1);

            it("should revert the transfer", async function () {
              await expectRevert(
                transfer.call(this, initialHolder, recipient, amount),
                "transfer amount exceeds balanc"
              );
            });
          });

          describe("when sender transfer all balance", function () {
            const amount = initialSupply;

            it("transfer the requested amount", async function () {
              await transfer.call(this, initialHolder, recipient, amount);

              expect(
                await this.token.balanceOf(initialHolder)
              ).to.be.bignumber.equal("0");
              expect(
                await this.token.balanceOf(recipient)
              ).to.be.bignumber.equal(amount);
            });

            it("emits a transfer event", async function () {
              const { logs } = await transfer.call(
                this,
                initialHolder,
                recipient,
                amount
              );

              expectEvent.inLogs(logs, "Transfer", {
                from: initialHolder,
                to: recipient,
                value: amount,
              });
            });
          });
        });
      });
    });
  });
});
