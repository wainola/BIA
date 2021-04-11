pragma solidity ^0.8.3;

/* THE IDEA OF THIS CONTRACT IS TO PERFORM SOME OPERATIONS REGARDING
CONVERSION BETWEEN STRINGS O ARRAY OF STRINGS AND BYTES32
*/

contract FactoryBallot {
    string[] proposals;
    bytes32[] dataConverted;
    string someString;

    function pushToProposals(string memory param) public {
        proposals.push(param);
    }

    function convertToBytes(string memory param)
        public
        returns (bytes32 result)
    {
        bytes memory s = bytes(param);

        if (s.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(s, 32))
        }
        dataConverted.push(result);
        return result;
    }

    function getDataConverted() public view returns (bytes32[] memory r) {
        return dataConverted;
    }

    function getProposalData(uint256 idx)
        public
        view
        returns (string memory r)
    {
        require(proposals.length != 0, "Empty array of proposals");
        require(idx <= proposals.length, "Out of range");
        return proposals[idx];
    }

    function getArrayOfProposalsToBytes()
        public
        payable
        returns (bytes32[] memory r)
    {
        require(proposals.length != 0, "Empty dataset");
        for (uint256 i = 0; i < proposals.length; i++) {
            convertToBytes(proposals[i]);
        }
        require(dataConverted.length != 0, "Empty array of bytes");
        return dataConverted;
    }
}
