// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address public owner;
    mapping(address => bool) public voters;

    uint256 public votingStart;
    uint256 public votingEnd;
    bool public votingStopped;

    constructor(string[] memory _candidateNames, uint256 _durationInMinutes) {
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(
                Candidate({name: _candidateNames[i], voteCount: 0})
            );
        }
        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
        votingStopped = false;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only contract owner can call this function."
        );
        _;
    }

    modifier votingNotStopped() {
        require(!votingStopped, "Voting has been stopped.");
        _;
    }

    // function addCandidate(string memory _name) public onlyOwner votingNotStopped {
    //     candidates.push(Candidate({name: _name, voteCount: 0}));
    // }

    function addCandidates(string[] memory _names) public onlyOwner votingNotStopped {
    for (uint256 i = 0; i < _names.length; i++) {
        candidates.push(Candidate({name: _names[i], voteCount: 0}));
    }
}


    function vote(uint256 _candidateIndex) public votingNotStopped {
        require(!voters[msg.sender], "You have already voted.");
        require(
            _candidateIndex < candidates.length,
            "Invalid candidate index."
        );
        require(getVotingStatus(), "Voting is closed.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;
    }

    function getAllVotesOfCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= votingStart, "Voting has not started yet.");
        if (block.timestamp >= votingEnd) {
            return 0;
        }
        return votingEnd - block.timestamp;
    }

    function stopVoting() public onlyOwner {
        votingStopped = true;
    }

    function clearData() public onlyOwner {
        // for (uint256 i = 0; i < candidates.length; i++) {
        //     candidates[i].voteCount = 0; // ล้างค่า voteCount ในแต่ละผู้สมัคร
        // }
        delete candidates;
        votingStart = 0;
        votingEnd = 0;
        votingStopped = false;
    }

    //กำหนดเวลาของ Voting ใหม่
    function setVotingEnd(uint256 _durationInMinutes) public onlyOwner {
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }
}
