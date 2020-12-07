// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.7.0;
pragma experimental ABIEncoderV2;

struct Message {
    address app;
    bytes payload;
    uint64 nonce;
}

contract MessageTest {

    uint something;

    function verifyAndDispatch(bytes32 blockHash, Message[] calldata messages) external {

        something = something + 1;

    }

}
