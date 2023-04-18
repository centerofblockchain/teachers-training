// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Note {
    //Мы можем писать заметки а также читать наши заметки
    string myNote; //state variable (состояние переменная)

    //модификаторы доступа: private, internal, extarnal, public
    //Если public -> автоматический создается геттер функция

    //reference type (ссылочных типов) локальных переменных пишем memory
    event NoteSubmitted(address sender, string note);

    function setNote(string memory _note) public {
        require(bytes(_note).length > 4, "Should have at least 5 characters");
        myNote = _note;
        emit NoteSubmitted(msg.sender, myNote);
    }

    function pureNote(
        string memory _pureNote
    ) public pure returns (string memory) {
        //pure вы даже не читаете state
        return _pureNote;
    }

    function getNote() public view returns (string memory) {
        //view = gasless (бесплатной)
        return myNote;
    }
}
