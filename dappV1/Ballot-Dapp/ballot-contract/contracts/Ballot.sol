pragma solidity >=0.4.22 <=0.6.0;

contract Ballot {
    struct Voter {
        uint256 weigth;
    }

    struct Proposal {
        string name;
    }

    address chairperson;
    mapping(address => Voter) voters;
    Proposal[] proposals;

    modifier onlyChair() {
        require(msg.sender == chairperson);
        _;
    }

    modifier validVoter() {
        require(voters[msg.sender].weigth > 0, "Not a Registered Voter");
        _;
    }

    constructor(uint256 numProposals) public {}

    function register(address voter) public onlyChair {}

    function vote(uint256 toProposal) public validVoter {}

    function reqWinner() public view returns (uint256 winningProposal) {}
}
