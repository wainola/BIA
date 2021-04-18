import { useEffect, useState } from "react";
import "./App.css";
import { FactoryBallot } from "./utils";

function App() {
  const setFactoryBallot = async () => {
    try {
      const factoryBallot = await FactoryBallot;
      console.log(factoryBallot);
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
