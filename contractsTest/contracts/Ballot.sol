pragma solidity ^0.8.0;

contract Ballot {
    struct Voter {
        uint256 weight;
        bool voted;
        address delegate; // person delegated to
        uint256 vote;
    }

    struct Proposal {
        bytes32 name; // short name
        uint256 voteCount; // number of accumulated votes
    }

    address public chairperson; // this address is not payable

    // this declares a state variable
    // stores a Voter for each posible address
    mapping(address => Voter) public voters;

    // Dynamically sized array of proposals
    Proposal[] public proposals;

    constructor(bytes32[] memory proposalNames) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        // for each of the provided proposals names
        // create a new proposal object and add it
        // to the end of the array

        for (uint256 i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    // Give a voter the right to vote on this ballot
    // it could only be called by chairperson
    function giveRigthToVote(address voter) public {
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote"
        );

        require(!voters[voter].voted, "The voter already voted");

        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    function delegate(address to) public {
        // asigns a reference
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted");
        require(to != msg.sender, "Self-delegation is disallowed");

        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // we found a loop in the delegation, not allowed
            require(to != msg.sender, "Found loop in delegation");
        }

        // since sender is a reference this
        // modifies voters[msg.sender].voted]
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];

        if (delegate_.voted) {
            // if the delegate already voted
            // directly add to the number of votes
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            delegate_.weight += sender.weight;
        }
    }

    // give your vote (including votes delegated to you)
    // to proposals[proposal].name

    function vote(uint256 proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no rigth to vote");
        require(!sender.voted, "Already voted");
        sender.voted = true;
        sender.vote = proposal;

        proposals[proposal].voteCount += sender.weight;
    }

    ///@dev computes the winning proposal taking all
    /// previous votes into account
    function winningProposal() public view returns (uint256 winningProposal) {
        uint256 winningVoteCount = 0;

        for (uint256 p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal = p;
            }
        }
    }

    // calls the winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner

    function winnerName() public view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
