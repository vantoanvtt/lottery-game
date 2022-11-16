pragma solidity ^0.8.17;
 
//import "hardhat/console.sol";
import "./BaseBetting.sol";
 
contract Betting is BaseBetting {
    
    uint totalWager = 0;
    uint numberOfWagers = 0;
    uint winningNumber = 999;
    address payable[] playerAddresses;
    mapping (address => bool) playerAddressesMapping;
    mapping(address => Player) playerDetails;

    // the constructor for the contract
    constructor (uint _minWager) BaseBetting(_minWager) {}

    function bet(uint number) public payable {
        // you check using the mapping for performance reasons
        require(playerAddressesMapping[msg.sender] == false);

        // check the range of numbers allowed
        require(number >= 1 && number <= MAX_WINNING_NUMBER);
        
        // note: that msg.value is in wei; need to convert to ether
        require( (msg.value / (1 ether)) >= minWager);

        // record the number and amount wagered by the player
        playerDetails[msg.sender].amountWagered = msg.value;
        playerDetails[msg.sender].numberWagered = number;

        // add the player address to the array of addresses as well as mapping
        playerAddresses.push(payable(msg.sender));
        playerAddressesMapping[msg.sender] = true;
        numberOfWagers++;
        totalWager += msg.value;

        if (numberOfWagers >= MAX_NUMBER_OF_WAGERS) {
            announceWinners();
        }

        // call the event to inform the client about the status of the game
        emit Status(numberOfWagers, MAX_NUMBER_OF_WAGERS);
     }

    function announceWinners() private {
        winningNumber = uint(keccak256(abi.encodePacked(block.timestamp))) % MAX_WINNING_NUMBER + 1;

        address payable[MAX_NUMBER_OF_WAGERS] memory winners;
        uint winnerCount = 0;
        uint totalWinningWager = 0;

        // call the event to announce the winning number
        emit WinningNumber(winningNumber);

        // find out the winners
        for (uint i=0; i < playerAddresses.length; i++) {
            // get the address of each player
            address payable playerAddress = playerAddresses[i];

            // if the player betted number is the winning number
            if (playerDetails[playerAddress].numberWagered == winningNumber) {
                // save the player address into the winners array
                winners[winnerCount] = playerAddress;
                // sum up the total wagered amount for the winning numbers
                totalWinningWager += playerDetails[playerAddress].amountWagered;
                winnerCount++;
            }
        }

        // make payments to each winning player
        for (uint j = 0; j < winnerCount; j++) {
            winners[j].transfer(
            (playerDetails[winners[j]].amountWagered / totalWinningWager)
            *
            totalWager);
        }
    }

    function getWinningNumber() view public returns (uint) {
        return winningNumber;
    }

    function getStatus() view public returns (uint, uint) {
        return (numberOfWagers, MAX_NUMBER_OF_WAGERS);
    }
}