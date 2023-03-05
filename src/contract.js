import { ethers } from "ethers";

const address = "0x3E8562AE3d64809321FB651D30173E6A69c4bD01";
const abi = [
  "constructor()",
  "function addAddress(address newAddress)",
  "function isMember() view returns (bool)",
  "function isOwnerOfNFT() view returns (bool)",
  "function members(address) view returns (bool)",
  "function nftOwnerList(uint256) view returns (address)"
];

let provider;

if (window.ethereum !== undefined) {
  provider = new ethers.providers.Web3Provider(window.ethereum);
}

export const connect = async () => {
  await provider.send("eth_requestAccounts", []);
  return getContract();
};

export const getContract = async () => {
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return { signer: signer, contract: contract };
};