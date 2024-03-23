// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract VotingClosure {
//     address public owner;
//     uint256 public votingEnd;

//     constructor(uint256 _votingEnd) {
//         owner = msg.sender;
//         votingEnd = _votingEnd;
//     }

//     modifier onlyOwner() {
//         require(
//             msg.sender == owner,
//             "Only contract owner can call this function."
//         );
//         _;
//     }

//     function closeVoting() public onlyOwner {
//         // Ensure that the voting process has not ended yet
//         require(block.timestamp < votingEnd, "Voting has already ended.");

//         // Close the voting process by setting the end time to the current time
//         votingEnd = block.timestamp;
//     }
// }
