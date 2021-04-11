pragma solidity >=0.4.16 <0.9.0;

contract OwnedToken {
    address public owner;
    string public name;

    bytes32 constant myHash = keccak256("PEO");

    constructor(string memory _name) public {
        owner = msg.sender;
        name = _name;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function changeName(string memory newName) public onlyOwner {
        name = newName;
    }

    function getString() public view onlyOwner returns (bytes32 s) {
        return myHash;
    }

    event Received(address, uint256);

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}
