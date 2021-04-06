pragma solidity >=0.4.22 <=0.6.0;

contract Ballot {
    struct Voter {
        uint256 weight;
        bool voted;
        uint256 vote;
    }
    struct Proposal {
        uint256 voteCount;
    }

    address chairperson;
    mapping(address => Voter) voters;
    Proposal[] proposals;

    //modifiers

    modifier onlyChair() {
        require(msg.sender == chairperson);
        _;
    }

    modifier validVoter() {
        require(voters[msg.sender].weight > 0, "Not a Registered Voter");
        _;
    }

    constructor(uint256 numProposals) public {
        chairperson = msg.sender;
        voters[chairperson].weight = 2; // weight 2 for testing purposes
        //proposals.length = numProposals; -- before 0.6.0
        for (uint256 prop = 0; prop < numProposals; prop++)
            proposals.push(Proposal(0));
    }

    function register(address voter) public onlyChair {
        voters[voter].weight = 1;
        voters[voter].voted = false;
    }

    function vote(uint256 toProposal) public validVoter {
        Voter memory sender = voters[msg.sender];

        require(!sender.voted);
        require(toProposal < proposals.length);

        sender.voted = true;
        sender.vote = toProposal;
        proposals[toProposal].voteCount += sender.weight;
    }

    function reqWinner() public view returns (uint256 winningProposal) {
        uint256 winningVoteCount = 0;
        for (uint256 prop = 0; prop < proposals.length; prop++)
            if (proposals[prop].voteCount > winningVoteCount) {
                winningVoteCount = proposals[prop].voteCount;
                winningProposal = prop;
            }
        assert(winningVoteCount >= 3);
    }
}
