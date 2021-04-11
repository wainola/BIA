pragma solidity ^0.8.3;

contract FactoryBallot {
    string[] proposals;
    bytes32[] proposalsConverted;

    function convertToBytes(string memory proposalStored)
        private
        returns (bytes32 result)
    {
        bytes memory proposalToBytes = bytes(proposalStored);
        if (proposalToBytes.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(proposalToBytes, 32))
        }
        return result;
    }

    function pushToArrayOfBytes(string memory proposal) private {
        bytes32 result = convertToBytes(proposal);
        proposalsConverted.push(result);
    }

    // we check if the value passed to the function is emptty
    modifier checkValueNotEmpty(string memory value) {
        require(bytes(value).length != 0, "Value passed is empty");
        _;
    }

    function setProposal(string memory proposal)
        public
        checkValueNotEmpty(proposal)
    {
        pushToArrayOfBytes(proposal);
    }

    function getArrayOfBytes() public view returns (bytes32[] memory data) {
        return proposalsConverted;
    }
}
