import React, { useContext } from "react";
import { Context } from "../App";

const Proposals = ({ accounts, contractInstance }) => {
  const context = useContext(Context);
  console.log("account selected", context.accountSelected);
  return (
    <div>
      <h2>PROPOSALS AND VOTING</h2>
    </div>
  );
};

export default Proposals;
