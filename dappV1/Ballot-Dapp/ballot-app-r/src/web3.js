import TruffleContract from "@truffle/contract";
import proposals from "./proposals.json";

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
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(App.url);
    }

    web3 = new Web3(App.web3Provider);
    ethereum.enable();
    App.populateAddress();
    return App.initContacts();
  },
  initContracts: function () {},
};
