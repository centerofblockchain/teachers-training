// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Note is ERC20 {
    string myNote;
    event NoteSubmitted(address sender, string note);

    constructor() ERC20("NoteToken", "NT") {}

    function setNote(string memory _note) public {
        require(bytes(_note).length > 4, "Should have at least 5 characters");
        myNote = _note;
        emit NoteSubmitted(msg.sender, myNote);
        _mint(msg.sender, 1 * 10 ** 18);
    }

    function pureNote(
        string memory _pureNote
    ) public pure returns (string memory) {
        return _pureNote;
    }

    function getNote() public view returns (string memory) {
        return myNote;
    }
}
