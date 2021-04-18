import { useEffect, useState } from "react";
import FactoryBallot from "./contracts/FactoryBallot.json";
import { FactoryBallot as FactoryBallotProvider } from "./utils";
import "./App.css";

function App() {
  const [contractInstance, setContractInstance] = useState(null);
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
  }, []);

  return (
    <div className="App">
      <h1>Ballor App</h1>
    </div>
  );
}

export default App;
