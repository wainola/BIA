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

  const transfer = function (from, to, value) {
    return this.token.transfer(to, value, { from });
  };

  const approve = function (from, to, value) {
    return this.token.approve(to, value, { from });
  };

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

          describe("when the sender transfer zero tokens", function () {
            const amount = new BN("0");
            it("transfer the requested amount", async function () {
              await transfer.call(this, initialHolder, recipient, amount);

              expect(
                await this.token.balanceOf(initialHolder)
              ).to.be.bignumber.equal(initialSupply);

              expect(
                await this.token.balanceOf(recipient)
              ).to.be.bignumber.equal("0");
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

    describe("ERC20 Approve", function () {
      describe("when the sender has enough balance", function () {
        const amount = initialSupply;

        it("emits and approval event", async function () {
          const { logs } = await approve.call(
            this,
            initialHolder,
            recipient,
            amount
          );

          expectEvent.inLogs(logs, "Approval", {
            owner: initialHolder,
            spender: recipient,
            value: amount,
          });
        });
      });
      describe("when there was no approved amount before", function () {
        const amount = initialSupply;
        it("approves the request amount", async function () {
          await approve.call(this, initialHolder, recipient, amount);

          expect(
            await this.token.allowance(initialHolder, recipient)
          ).to.be.bignumber.equal(amount);
        });
      });

      describe("when the spender had an approved amount", function () {
        const amount = initialSupply;
        beforeEach(async function () {
          await approve.call(this, initialHolder, recipient, new BN(1));
        });

        it("approves the requested amount and replaces the previous one", async function () {
          await approve.call(this, initialHolder, recipient, amount);

          expect(
            await this.token.allowance(initialHolder, recipient)
          ).to.be.bignumber.equal(amount);
        });
      });
    });
  });
});
