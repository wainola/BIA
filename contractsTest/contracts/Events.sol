pragma solidity >=0.4.16 <0.9.0;

contract ClientReceipt {
    event Deposit(address _from, string id, uint256 value);

    function deposit(string memory id) public payable {
        emit Deposit(msg.sender, id, msg.value);
    }
}
