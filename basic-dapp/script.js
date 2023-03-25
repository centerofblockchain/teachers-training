const contractAddress = "0x529d961919b01e7b5de549310B0e7931b33163DE";
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_note",
        type: "string",
      },
    ],
    name: "setNote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNote",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const provider = new ethers.providers.Web3Provider(window.ethereum, 97); //bnbchain testnet
let signer;
let contract;

//Нужно будет создать функцию
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    contract = new ethers.Contract(contractAddress, abi, signer);
  });
});

async function setNote() {
  //Добавить note в смарт-контракт
  const note = document.getElementById("note").value;
  await contract.setNote(note);
}

async function getNote() {
  //Запросить note из смарт-контракта
  const note = await contract.getNote();
  //signer.getAddress()
  document.getElementById("result").innerText = note;
}
