import { useEffect, useState } from "react";
import "./App.css";
import proposals from "./proposals.json";
// import TruffleContract from "@truffle/contract";
import { Web3App } from "./web3";
import { initContracts, adopt, makrAdopted, getAccounts } from "./web3Adoption";

function App() {
  const [contract, setContract] = useState(null);
  const [adoptedPets, setAdopted] = useState([]);
  const [accounts, setAccounts] = useState(null);
  const [accountToUse, setAccountToUse] = useState("");

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

  useEffect(() => {
    if (adoptedPets.length) {
      makrAdopted(contract);
    }
  }, [adoptedPets]);

  useEffect(() => {
    if ("web3" in window) {
      getAccounts(setAccounts);
    }
  }, []);

  const handleClick = (id) => (evt) => {
    adopt(id, accountToUse, contract);
    setAdopted([...adoptedPets, id]);
  };

  const handleChange = ({ target: { value } }) => setAccountToUse(value);

  return (
    <div className="App">
      <div>
        <h3>Accounts</h3>
        <select onChange={handleChange}>
          {accounts &&
            Array.isArray(accounts) &&
            accounts.map((account, idx) => (
              <option key={idx} value={account}>
                {account}
              </option>
            ))}
        </select>
      </div>
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
