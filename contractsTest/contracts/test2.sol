pragma solidity >=0.4.16 <0.9.0;

contract Test2 {
    struct Person {
        uint256 age;
        string name;
        string lastname;
        string email;
        bool married;
    }

    struct Skills {
        bytes listOfSkills;
    }

    mapping(address => uint256) public balances;

    mapping(address => Person) public persons;
    mapping(address => Skills) public personSkills;

    string[] list;

    // this would be a bytes of data
    bytes[] secondList;

    function update(uint256 newBalance) public {
        balances[msg.sender] = newBalance;
    }

    function setPersonData(
        uint256 age,
        string memory name,
        string memory lastname,
        string memory email,
        bool married
    ) public {
        Person memory p = persons[msg.sender];
        p.name = name;
        p.age = age;
        p.lastname = lastname;
        p.email = email;
        p.married = married;
    }

    function setListItem(string memory item) public {
        list.push(item);
    }

    function getLengthList() public view returns (uint256 l) {
        return list.length;
    }

    function getArrayElement(string memory el)
        public
        view
        returns (string memory theElement, bool isTheSame)
    {
        for (uint256 i = 0; i < list.length; i++) {
            string memory value = list[i];
            // note that is not safe to deal with this kind of data
            // on solidity
            if (keccak256(bytes(value)) == keccak256(bytes(el))) {
                return (value, true);
            }
        }
    }

    function setSecondListImte(string memory data) public {
        secondList.push(bytes(data));
    }

    function getSecondListLength() public view returns (uint256 l) {
        return secondList.length;
    }

    function getElementFromSecondList(string memory data)
        public
        view
        returns (string memory value, bool isIncluded)
    {
        for (uint256 i = 0; i < secondList.length; i++) {
            if (keccak256(secondList[i]) == keccak256(bytes(data))) {
                return (string(secondList[i]), true);
            }
        }
    }
}
