import React from "react";

const Accounts = ({ accounts }) => {
  return (
    <div>
      <div>
        <h3>Accounts</h3>
      </div>
      <div>
        <select name="" id="">
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
