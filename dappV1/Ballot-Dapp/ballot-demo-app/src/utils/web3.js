import Web3 from "web3";
import FactoryBallot from "../contracts/FactoryBallot.json";

export const webProvider = new Web3.providers.HttpProvider(
  "http://localhost:7545"
);

const initWeb3 = () => {
  window.web3 = new Web3(webProvider);
};

export default initWeb3;
