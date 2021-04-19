import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App";

const Proposals = ({ accounts, contractInstance }) => {
  const [voter, setVoter] = useState(null);
  const context = useContext(Context);
  console.log("account selected", context);

  useEffect(() => {
    if (Object.keys(context.ballotContext).length) {
      const {
        ballotContext: { lastVoterInfo },
      } = context;
      setVoter({
        ...lastVoterInfo,
      });
    }
  }, [context.ballotContext]);

  return (
    <div>
      <h2>
        {voter ? (
          <span>
            Hello {voter.name} {voter.lastname}
          </span>
        ) : (
          <span>Hello stranger, there is no account related to you</span>
        )}
      </h2>
      <div>
        {voter && (
          <form action="">
            <input type="text" placeholder="Proposal title" />
            <input type="text" placeholder="Proposal description" />
            <button type="submit">Submit proposal</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Proposals;
