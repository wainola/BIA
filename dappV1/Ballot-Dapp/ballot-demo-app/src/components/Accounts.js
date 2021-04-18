import React, { useReducer, useEffect } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_VOTER":
      return state;
    default:
      return state;
  }
};

const Accounts = ({ accounts, contractInstance }) => {
  const initialState = {
    voters: {},
    infoVoter: {},
  };

  const [state, dispatcher] = useReducer(reducer, initialState);
  const handlechange = ({ target: { value } }) => contractInstance;
  return (
    <div>
      <div>
        <h3>Accounts</h3>
      </div>
      <div>
        <select
          name=""
          id=""
          onChange={(e) => {
            console.log("event", e.target.value);
          }}
        >
          {accounts.length &&
            accounts.map((acc, idx) => (
              <option key={idx} value={acc}>
                {acc}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Accounts;
