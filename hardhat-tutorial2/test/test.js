const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("Note", function () {
  let noteFactory, contract;
  beforeEach(async function () {
    noteFactory = await ethers.getContractFactory("Note");
    contract = await noteFactory.deploy();
  });

  it("Should have empty string after deployment", async function () {
    const expectedNote = "";
    const myNote = await contract.getNote();

    assert.equal(expectedNote, myNote);
  });

  it("Should update note", async function () {
    const myNote = "Dias note";
    await contract.setNote(myNote);
    const currentNote = await contract.getNote();
    expect(myNote).to.be.equal(currentNote);
  });

  it("Should revert if string has less than 5 characters", async function () {
    await expect(contract.setNote("Dias")).to.be.revertedWith(
      "Should have at least 5 characters"
    );
  });

  it("Should emit event for setnote function", async function () {
    await expect(contract.setNote("Dias Note")).to.emit(
      contract,
      "NoteSubmitted"
    );
  });
});
