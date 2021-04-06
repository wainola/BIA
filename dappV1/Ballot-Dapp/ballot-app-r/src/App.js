import { useEffect, useState } from "react";
import "./App.css";
import proposals from "./proposals.json";
// import TruffleContract from "@truffle/contract";
import { Web3App } from "./web3";
import { initContracts, adopt } from "./web3Adoption";

function App() {
  const [contract, setContract] = useState(null);

  const getContractInstance = async () => {
    try {
      const instanceContract = await initContracts();
      setContract(instanceContract);
    } catch (error) {
      setContract({
        error,
      });
    }
  };

  useEffect(() => {
    if (!contract) {
      getContractInstance();
    }
  }, []);

  const handleClick = (id) => (evt) => {
    console.log("clicked");
    adopt(id, contract);
  };
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
            gridAutoRows: "minmax(100px, auto)",
          }}
        >
          {proposals.map((p, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "400px",
                width: "200px",
                marginBotton: "30px",
              }}
            >
              <img
                src={p.picture}
                style={{
                  height: "300px",
                  width: "200px",
                }}
              />
              <div>
                <h3>{p.name}</h3>
                <button onClick={handleClick(p.id)}>Vote!</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
