pragma solidity ^0.8.3;

contract FactoryBallot {
    address public chairperson;

    struct Proposal {
        string title;
        string description;
        uint256 votes;
        uint256 weight;
    }

    struct Voter {
        string name;
        string lastname;
        string email;
        uint256 weight;
        Proposal[] proposals;
    }

    mapping(address => Voter) public voters;

    constructor() {
        chairperson = msg.sender;
    }

    modifier onlyChairperson {
        require(
            msg.sender == chairperson,
            "Only chairperson can register new voters"
        );
        _;
    }

    modifier checkInfoVoter {
        require(
            msg.sender == chairperson,
            "Only chairperson can see infor voter"
        );
        _;
    }

    modifier checkAddressNotEmpty(address v) {
        require(bytes20(v).length != 0, "No address supplied");
        _;
    }

    // CHAIRPERONS REGISTER VOTERS
    function registerVoters(
        address voter,
        string memory name,
        string memory lastname,
        string memory email
    ) public onlyChairperson checkAddressNotEmpty(voter) {
        Voter storage v = voters[voter];
        v.name = name;
        v.lastname = lastname;
        v.email = email;
    }

    function getInfoVoter(address voter)
        public
        view
        checkInfoVoter
        checkAddressNotEmpty(voter)
        returns (
            string memory name,
            string memory lastname,
            string memory email
        )
    {
        Voter storage v = voters[voter];
        name = v.name;
        lastname = v.lastname;
        email = v.email;

        return (name, lastname, email);
    }

    // set the proposal and it could contain weight in order
    // to increase the chances to be on top of the proposal list
    function setProposal(
        address addr,
        string memory title,
        string memory description
    ) public payable checkAddressNotEmpty(addr) {
        Voter storage voter = voters[addr];

        Proposal memory p = Proposal(title, description, 0, msg.value);
        voter.proposals.push(p);
    }

    function getProposal(address addr, string memory proposalTitle)
        public
        view
        checkAddressNotEmpty(addr)
        returns (Proposal memory result)
    {
        Voter memory v = voters[addr];
        for (uint256 i = 0; i < v.proposals.length; i++) {
            // we do this becauses is the only way
            // as far as I know, to compare to strings
            bytes32 str1 = keccak256(bytes(v.proposals[i].title));
            bytes32 str2 = keccak256(bytes(proposalTitle));
            if (str1 == str2) {
                result = v.proposals[i];
                return result;
            }
        }
    }

    function vote(address addr, string memory proposalTitle)
        public
        payable
        checkAddressNotEmpty(msg.sender)
    {
        Voter storage voter = voters[addr];
        Proposal[] storage proposals = voter.proposals;

        bytes32 proposalTitleForComparison = keccak256(bytes(proposalTitle));
        for (uint256 i = 0; i < proposals.length; i++) {
            bytes32 proposalOfVoter = keccak256(bytes(proposals[i].title));
            if (proposalTitleForComparison == proposalOfVoter) {
                proposals[i].votes += 1;
                return
            }
        }
    }

    function getVotesForProposal(address addr, string memory proposalTitle) {
        
    }
}
