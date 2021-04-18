import { useEffect, useState } from "react";
import FactoryBallot from "./contracts/FactoryBallot.json";
import { FactoryBallot as FactoryBallotProvider, getAccounts } from "./utils";
import { Accounts } from "./components";
import "./App.css";

function App({ web3 }) {
  const [contractInstance, setContractInstance] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const setFactoryBallot = async () => {
    try {
      const factoryBallot = await FactoryBallotProvider.setDeployedInstance(
        FactoryBallot
      );
      setContractInstance(factoryBallot);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setFactoryBallot();
    getAccounts(web3, setAccounts);
  }, []);

  console.log("contract", contractInstance);
  console.log("web3", accounts);

  return (
    <div className="App">
      <h1>Ballor App</h1>
      <div>
        <Accounts accounts={accounts} contractInstance={contractInstance} />
      </div>
      <div>
        <h3>Proposals and voting</h3>
      </div>
    </div>
  );
}

export default App;
