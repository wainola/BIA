// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC20Token.sol";

contract MyTokenERC20Mock is MyTokenERC20 {
    constructor(
        string memory name,
        string memory symbol,
        address initialAccount,
        uint256 initialBalance
    ) payable MyTokenERC20(name, symbol) {
        _mint(initialAccount, initialBalance);
    }
}
