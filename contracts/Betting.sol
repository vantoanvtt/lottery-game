pragma solidity ^0.8.17;
import "hardhat/console.sol";

contract Betting {
    address payable owner;
    uint256 minWager = 1;
    uint256 totalWager = 0;
    uint256 numberOfWagers = 0;
    uint256 constant MAX_NUMBER_OF_WAGERS = 2;
    uint256 winningNumber = 999;
    uint256 constant MAX_WINNING_NUMBER = 3;
    address payable[] playerAddresses;
    mapping(address => bool) playerAddressesMapping;
    struct Player {
        uint256 amountWagered;
        uint256 numberWagered;
    }
    mapping(address => Player) playerDetails;
    // the event to announce the winning number
    event WinningNumber(uint256 number);
    // the event to display the status of the game
    event Status(uint256 players, uint256 maxPlayers);

    // the constructor for the contract
    constructor(uint256 _minWager) public {
        owner = payable(msg.sender);
        // set the minimum amount wager amount allowed
        // note that this number is in ether
        if (_minWager > 0) minWager = _minWager;
    }

    function bet(uint256 number) public payable {
        // ensure that each player can play once
        // you check using the mapping for performance reasons
        // require(playerAddressesMapping[msg.sender] == false);
        // check the range of numbers allowed
        require(number >= 1 && number <= MAX_WINNING_NUMBER);
        // note that msg.value is in wei; need to convert to
        // ether
        require((msg.value / (1 ether)) >= minWager);
        // record the number and amount wagered by the player
        playerDetails[msg.sender].amountWagered = msg.value;
        playerDetails[msg.sender].numberWagered = number;
        // add the player address to the array of addresses as
        // well as mapping
        playerAddresses.push(payable(msg.sender));
        playerAddressesMapping[msg.sender] = true;
        numberOfWagers++;
        totalWager += msg.value;
        if (numberOfWagers >= MAX_NUMBER_OF_WAGERS) {
            announceWinners();
        }
        // call the event to inform the client about the
        // status of the game
        emit Status(numberOfWagers, MAX_NUMBER_OF_WAGERS);
    }

    function announceWinners() private {
        //winningNumber =
        //uint(keccak256(abi.encodePacked(block.timestamp))) %
        // MAX_WINNING_NUMBER + 1;
        // hard code the winning number to see what happens
        // when the contract is killed
        winningNumber = 1;
        // call the event to announce the winning number
        // find out the winners
        // call the event to announce the winning number
        emit WinningNumber(winningNumber);
        address payable[MAX_NUMBER_OF_WAGERS] memory winners;
        uint256 winnerCount = 0;
        uint256 totalWinningWager = 0;
        for (uint256 i = 0; i < playerAddresses.length; i++) {
            address payable playerAddress = playerAddresses[i];
            if (playerDetails[playerAddress].numberWagered == winningNumber) {
                winners[winnerCount] = playerAddress;
                totalWinningWager += playerDetails[playerAddress].amountWagered;
                winnerCount++;
            }
        }
        for (uint256 j = 0; j < winnerCount; j++) {
            winners[j].transfer(
                (playerDetails[winners[j]].amountWagered / totalWinningWager) *
                    totalWager
            );
        }
        // if there is no winner, transfer all
        // the remaining ethers back to owner
        if (winnerCount == 0) {
            owner.transfer(address(this).balance);
        }
    }

    function getWinningNumber() public view returns (uint256) {
        return winningNumber;
    }

    function kill() public {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }

    function getStatus() public view returns (uint256, uint256) {
        return (numberOfWagers, MAX_NUMBER_OF_WAGERS);
    }

    function getTotalWager() public view returns (uint256) {
        return totalWager;
    }
}
