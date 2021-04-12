pragma solidity ^0.8.3;

contract Conversions {
    string[] proposals;
    bytes[] proposalsConverted;

    function convertToBytes(string memory proposalStored)
        private
        pure
        returns (bytes memory result)
    {
        bytes memory proposalToBytes = bytes(proposalStored);
        // TODO: this for now is not necessary
        // if (proposalToBytes.length == 0) {
        //     return 0x0;
        // }
        // assembly {
        //     result := mload(add(proposalToBytes, 32))
        // }
        return proposalToBytes;
    }

    function pushToArrayOfBytes(string memory proposal) private {
        bytes memory result = convertToBytes(proposal);
        proposalsConverted.push(result);
    }

    // we check if the value passed to the function is emptty
    modifier checkValueNotEmpty(string memory value) {
        require(bytes(value).length != 0, "Value passed is empty");
        _;
    }

    // function to pass a string for proposal
    // this string is converted to bytes
    // TODO: encrypt this or the resulted data
    function setProposal(string memory proposal)
        public
        checkValueNotEmpty(proposal)
    {
        pushToArrayOfBytes(proposal);
    }

    // returns the array of proposals
    function getArrayOfBytes() public view returns (bytes[] memory data) {
        return proposalsConverted;
    }
}
