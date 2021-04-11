pragma solidity >=0.4.16 <0.9.0;

contract Test {
    address public chairperson;

    struct Person {
        uint32 age;
        string name;
        string lastname;
        string email;
        bool married;
    }

    mapping(address => Person) persons;
    uint256 numPerson;
    address[] public personData;

    constructor() public {
        chairperson = msg.sender;
    }

    function getChairPerson() public view returns (address chair_) {
        chair_ = chairperson;
    }

    function setPerson(
        address addr,
        uint32 _age,
        string memory _name,
        string memory _lastname,
        string memory _email,
        bool _married
    ) public {
        uint256 personId = numPerson++;
        Person storage p = persons[addr];
        p.age = _age;
        p.name = _name;
        p.lastname = _lastname;
        p.email = _email;
        p.married = _married;
    }

    // you cannot return compound types
    function getPersonNameAndLastname(address addr)
        public
        view
        returns (string memory name, string memory lastname)
    {
        Person storage p = persons[addr];
        return (p.name, p.lastname);
    }

    function getAge(address addr) public view returns (uint32 age) {
        Person storage p = persons[addr];
        return p.age;
    }
}
