import Web3 from "web3";
// import contract from "@truffle/contract";
import proposals from "./proposals.json";
import Ballot from "./contracts/Ballot.json";

const App = {
  web3Provider: null,
  contracts: {},
  names: [],
  url: "http://127.0.0.1:7545",
  chairPerson: null,
  currentAccount: null,
  init: function () {
    proposals.forEach((proposal) => App.names.push(proposals.name));
    return App.initWeb3();
  },
  initWeb3: function () {
    if (typeof Web3 !== "undefined") {
      App.web3Provider = Web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(App.url);
    }

    Web3 = new Web3(App.web3Provider);
    window.ethereum.enable();
    App.populateAddress();
    return App.initContacts();
  },
  initContracts: function () {
    App.contracts.vote = window.TruffleContract(Ballot);
    App.contracts.vote.setProvider(App.web3Provider);
    App.getChairperson();
    return App.bindEvents();
  },
  bindEvents: function () {},
  populateAddress: function () {
    new Web3(new Web3.providers.HttpProvider(App.url)).eth.getAccounts(
      (err, accounts) => {
        console.log("ACCOUNTS", accounts);
      }
    );
  },
  getChairperson: function () {},
};

export const Web3App = App;
