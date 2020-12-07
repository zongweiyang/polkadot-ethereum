// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.7.0;
pragma experimental ABIEncoderV2;

struct Message {
    address app;
    bytes payload;
    uint64 nonce;
}

contract MessageTest {

    event Called(uint numMessages, uint callDataLength);
    event Verified(bytes32 commitment);

    function verifyAndDispatch(bytes32 _blockHash, Message[] calldata messages) external {
        bytes memory messageData;
        assembly {
            messageData := mload(0x40)
            calldatacopy(messageData, 36, sub(calldatasize(), 36))
        }

        emit Called(messages.length, uint(msg.data.length));
    }

    function verifyFoo(bytes memory messageData) public {
        bytes32 commitment = keccak256(messageData);
        emit Verified(commitment);
    }

}
