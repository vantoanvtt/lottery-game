pragma solidity ^0.8.17;

abstract contract BaseBetting {
    address payable internal owner;
    uint internal minWager = 1;

    uint constant MAX_NUMBER_OF_WAGERS = 2;
    uint constant MAX_WINNING_NUMBER = 3;

    struct Player {
        uint amountWagered;
        uint numberWagered;
    }

    // the event to announce the winning number
    event WinningNumber(
        uint number
    );

    // the event to display the status of the game
    event Status (
        uint players,
        uint maxPlayers
    );

    constructor(uint _minWager) {
        owner = payable(msg.sender);
        if (_minWager > 0) minWager = _minWager;
    }
    
    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    function kill() public onlyOwner() {
        selfdestruct(owner);
    }
}