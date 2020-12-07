const MessageTest = artifacts.require("MessageTest");

const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("MessageTest", function (accounts) {

  describe("Test calldata", function () {
    beforeEach(async function () {
      this.messageTest = await MessageTest.new();
    });

    it("should call verifyAndDispatch", async function () {
      this.messageTest.should.exist;

      const blockHash = "0xc09d4a008a0f1ef37860bef33ec3088ccd94268c0bfba7ff1b3c2a1075b0eb92";

      const messages = [
        {
          app: accounts[0],
          payload: Buffer.from("deadbeef", "hex"),
          nonce: 1
        },
        {
          app: accounts[0],
          payload: Buffer.from("deadbeef", "hex"),
          nonce: 2
        }
      ]

      const { logs } = await this.messageTest.verifyAndDispatch(blockHash, messages).should.be.fulfilled;

      // Confirm app event emitted with expected values
      const event = logs.find(
          (e) => e.event === "Called"
      );

      Number(event.args.numMessages).should.be.bignumber.equal(2);
      Number(event.args.callDataLength).should.be.bignumber.equal(452);

    });
  });

});
