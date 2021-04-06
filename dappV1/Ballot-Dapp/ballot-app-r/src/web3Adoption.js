import Web3 from "web3";
import TruffleContract from "@truffle/contract";
import Adoption from "./contracts/Adoption.json";

const webProvider = new Web3.providers.HttpProvider("http://localhost:7545");

window.web3 = new Web3(webProvider);

export const initContracts = async () => {
  console.log("initContracts");
  const AdoptionContract = TruffleContract(Adoption);
  AdoptionContract.setProvider(webProvider);

  try {
    const deployedContractInstance = await AdoptionContract.deployed();
    return deployedContractInstance;
  } catch (error) {
    return error;
  }
};

const makrAdopted = () => {};

export const adopt = async (petId, contractInstance) => {
  if ("web3" in window) {
    return window.web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        return console.error(error);
      }

      const account = accounts[1];

      try {
        const adoptionResult = contractInstance.adopt(petId, { from: account });
        return resolveAdoptionStatus(adoptionResult);
      } catch (error) {
        console.error("Adoption_Result_Error", error);
      }
    });
  }
};

const resolveAdoptionStatus = async (adoptionResult) => {
  try {
    const result = await adoptionResult;
    console.log("Adoption Result", result);
  } catch (error) {
    console.log("Adoption_Result_Resolution_Error", error);
  }
};
