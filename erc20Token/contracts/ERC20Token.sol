// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Context.sol";
import "./IERC20.sol";

interface IERC20MetaData is IERC20 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);
}

contract MyTokenERC20 is Context, IERC20, IERC20MetaData {
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowance;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account)
        public
        view
        virtual
        override
        returns (uint256)
    {}

    function transfer(address recipient, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {}

    function allowance(address owner, address spender)
        public
        view
        virtual
        override
        returns (uint256)
    {}

    function approve(address spender, uint256 amount)
        public
        view
        virtual
        override
        returns (bool)
    {}

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {}

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "MyTokenERC20 mint to the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _totalSupply += amount;
        _balances[account] += amount;

        emit Transfer(address(0), account, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}
