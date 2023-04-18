const { ethers, run, network } = require("hardhat");

async function main() {
  const noteFactory = await ethers.getContractFactory("Note");
  const contract = await noteFactory.deploy();
  await contract.deployed();
  console.log(`Contract address ${contract.address}`);

  console.log(network.config);
  if (network.config.chainId === 97) {
    contract.deployTransaction.wait(6);
    verify(contract.address, []);
  }

  const txResponse = await contract.setNote("Note from Dias");
  txResponse.wait(1);
  const myNote = await contract.getNote();
  console.log(`My note: ${myNote}`);
}

async function verify(contractAddress, arguments) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: arguments,
    });
  } catch (e) {
    if (e.message.toLowerCase.includes("already verified")) {
      console.log("The contract already verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
