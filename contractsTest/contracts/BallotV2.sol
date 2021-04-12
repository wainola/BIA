pragma solidity ^0.8.3;

contract FactoryBallot {
    string[] proposals;
    bytes[] proposalsConverted;

    address public chairperson;

    struct Voter {
        string name;
        string lastname;
        string email;
    }

    mapping(address => Voter) public voters;

    constructor() {
        chairperson = msg.sender;
    }

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
}
