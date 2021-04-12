pragma solidity ^0.8.3;

contract FactoryBallot {
    address public chairperson;

    struct Voter {
        string name;
        string lastname;
        string email;
        uint256 weight;
    }

    struct Proposal {
        string title;
        string description;
        uint256 votes;
    }

    mapping(address => Voter) public voters;

    // TODO proposals must have an unique identifier
    mapping(address => Proposal) public proposals;

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
        onlyChairperson
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

    function setProposal(
        address addr,
        string memory title,
        string memory description
    ) public checkAddressNotEmpty(addr) {
        Proposal storage p = proposals[addr];
        p.title = title;
        p.description = description;
    }
}
