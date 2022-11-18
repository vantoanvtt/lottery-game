pragma solidity ^0.8.17;

import "hardhat/console.sol";

abstract contract BaseBetting {
    address payable internal owner;
    uint256 internal minWager = 1;

    uint256 constant MAX_NUMBER_OF_WAGERS = 2;
    uint256 constant MAX_WINNING_NUMBER = 3;

    struct Player {
        uint256 amountWagered;
        uint256 numberWagered;
    }

    // the event to announce the winning number
    event WinningNumber(uint256 number);

    // the event to display the status of the game
    event Status(uint256 players, uint256 maxPlayers);

    constructor(uint256 _minWager) {
        owner = payable(msg.sender);
        if (_minWager > 0) minWager = _minWager;
    }

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    function kill() public onlyOwner {
        selfdestruct(owner);
    }
}
