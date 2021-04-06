import Web3 from "web3";
import TruffleContract from "@truffle/contract";
import Adoption from "./contracts/Adoption.json";

const webProvider = new Web3.providers.HttpProvider("http://localhost:7545");

window.web3 = new Web3(webProvider);

const initContracts = () => {
  console.log("initContracts");
  const AdoptionContract = TruffleContract(Adoption);
  AdoptionContract.setProvider(webProvider);

  AdoptionContract.deployed()
    .then((instance) => instance.getAdopters.call())
    .then((adopters) => {
      console.log("Adopters", adopters);
    })
    .catch((err) => console.log("error", err));
};

export const initAdoptionContracts = {
  initContracts,
};
