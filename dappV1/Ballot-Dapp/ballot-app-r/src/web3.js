import Web3 from "web3";
import TruffleContract from "@truffle/contract";
import proposals from "./proposals.json";
import Ballot from "./contracts/Ballot.json";

const web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");

window.web3 = new Web3(web3Provider);

export const initContracts = async () => {
  const BallotContract = TruffleContract(Ballot);
  BallotContract.setProvider(web3Provider);

  try {
    const deployedInstance = await BallotContract.deployed();
    return deployedInstance;
  } catch (error) {
    return error;
  }
};

export const vote = (proposalId, account, contractInstance) => {
  try {
    const voteResult = contractInstance.vote(proposalId, { from: account });
    return resolveVoting(voteResult);
  } catch (error) {
    console.log("ERROR_VOTING", error);
  }
};

const resolveVoting = async (voteResult) => {
  try {
    const result = await voteResult;
    console.log("Voting result", result);
  } catch (error) {
    console.log("VOTING_RESULT", error);
  }
};

export const register = async (account, contractInstance) => {
  try {
    const registerResult = contractInstance.register(account);
    return resolveRegister(registerResult);
  } catch (error) {
    console.log("ERROR_REGISTERING", error);
  }
};

const resolveRegister = async (registerResult) => {
  try {
    const result = await registerResult;
    console.log("Register result", result);
  } catch (error) {
    console.log("ERROR_REGISTERING", error);
  }
};
