import "./App.css";
import proposals from "./proposals.json";
import TruffleContract from "@truffle/contract";

function App() {
  console.log("GGG", TruffleContract);
  const handleClick = (id) => (evt) => {
    console.log("clicked");
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
