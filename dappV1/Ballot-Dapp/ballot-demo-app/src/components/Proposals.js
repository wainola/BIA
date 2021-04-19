import React, { useContext, useEffect, useState, useReducer } from "react";
import { Context } from "../App";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PROPOSAL":
      const {
        payload: { name, value },
      } = action;
      return {
        ...state,
        [name]: value,
      };
    case "WANT_TO_PAY": {
      const {
        payload: { name, value },
      } = action;
      return {
        ...state,
        [name]: value,
      };
    }
    default:
      return state;
  }
};

const Proposals = ({ accounts, contractInstance }) => {
  const [voter, setVoter] = useState(null);
  const context = useContext(Context);

  const initState = {
    proposal: {},
    yes: false,
    no: false,
  };

  const [state, dispatcher] = useReducer(reducer, initState);
  console.log("account selected", context);

  useEffect(() => {
    if (
      context.ballotContext !== null ||
      Object.keys(context.ballotContext).length
    ) {
      const {
        ballotContext: { lastVoterInfo },
      } = context;
      setVoter({
        ...lastVoterInfo,
      });
    }
  }, [context.ballotContext]);

  const handleChange = ({ target: { name, value } }) => {
    dispatcher({
      type: "SET_PROPOSAL",
      payload: { name, value },
    });
  };

  const submit = async (evt) => {
    evt.preventDefault();
  };

  const handleRadio = ({ target: { name, value } }) => {
    const v = value !== "false" ? true : false;
    const nametoSend = v !== "false" ? "yes" : "no";

    dispatcher({
      type: "WANT_TO_PAY",
      payload: { name: nametoSend, value: v },
    });
  };

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
          <form onSubmit={submit}>
            <input
              type="text"
              name="title"
              placeholder="Proposal title"
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Proposal description"
              onChange={handleChange}
            />
            <div>
              <h4>Do you want to pay for your proposal</h4>
              <label for="yes">Yes</label>
              <input
                id="yes"
                type="radio"
                name="paying"
                onChange={handleRadio}
                value={true}
                checked={state.yes}
              />
            </div>
            <div>
              <label for="no">No</label>
              <input
                id="no"
                type="radio"
                name="paying"
                onChange={handleRadio}
                value={true}
                checked={state.no}
              />
            </div>

            <button type="submit">Submit proposal</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Proposals;
