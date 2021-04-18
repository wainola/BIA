import Web3 from "web3";

export const webProvider = new Web3.providers.HttpProvider(
  "http://localhost:7545"
);

const initWeb3 = () => {
  window.web3 = new Web3(webProvider);
};

export const getAccounts = (web3, accountUpdater) => {
  return web3.eth.getAccounts((error, accounts) => {
    if (error) {
      return console.error("ERROR_GETTING_ACCOUNTS", error);
    }
    return accountUpdater(accounts);
  });
};

export default initWeb3;
