import React, { useReducer, useEffect, useRef } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_VOTER":
      return state;
    case "SELECT_ACCOUNT":
      return {
        ...state,
        accountSelected: action.payload,
      };
    case "FILL_USER_DATA":
      const {
        payload: { name, value },
      } = action;
      return {
        ...state,
        voterToRegister: {
          ...state.voterToRegister,
          [name]: value,
        },
      };
    case "CLEAR_USER_TO_REGISTER":
      return {
        ...state,
        voterToRegister: {},
        accountSelected: "",
      };
    case "SET_CHAIRPERSON":
      return {
        ...state,
        chairperson: action.payload,
      };
    case "SUCCESS_REGISTERING":
      return {
        ...state,
        successRegistering: true,
        voterToRegister: {},
      };
    default:
      return state;
  }
};

const Accounts = ({ accounts, contractInstance }) => {
  const initialState = {
    voters: {},
    infoVoter: {},
    accountSelected: "",
    voterToRegister: {},
    chairperson: "",
    getInfoVoter: false,
    successRegistering: false,
  };

  const ref = useRef(null);

  const [state, dispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    if (accounts.length) {
      console.log("accounts", accounts);
      dispatcher({
        type: "SET_CHAIRPERSON",
        payload: accounts[0],
      });
    }
  }, [accounts]);

  const handlechange = async ({ target: { value } }) =>
    dispatcher({
      type: "SELECT_ACCOUNT",
      payload: value,
    });

  const handleInputChange = ({ target: { name, value } }) =>
    dispatcher({
      type: "FILL_USER_DATA",
      payload: { name, value },
    });

  const register = async (evt) => {
    evt.preventDefault();
    if (!Object.values(state.voterToRegister).includes("")) {
      // register voter
      const { voterToRegister, accountSelected, chairperson } = state;
      const { deployedInstance } = contractInstance;
      try {
        const r = await deployedInstance.registerVoters(
          accountSelected,
          voterToRegister.name,
          voterToRegister.lastname,
          voterToRegister.email,
          { from: chairperson }
        );
        console.log("RR", ref);
        ref.current.reset();
        return dispatcher({
          type: "SUCCESS_REGISTERING",
        });
      } catch (error) {
        console.log("Error", error);
      }
    }
    return dispatcher({
      type: "CLEAR_USER_TO_REGISTER",
    });
  };

  const getInfoVoter = async () => {
    const { deployedInstance } = contractInstance;
    const { accountSelected, chairperson } = state;
    try {
      const r = await deployedInstance.getInfoVoter(accountSelected, {
        from: chairperson,
      });
      console.log("GETTING INFO VOTER", r);
    } catch (error) {
      console.log("Error on getting last voter", error);
    }
  };
  return (
    <div>
      <div>
        <h3>Accounts</h3>
      </div>
      <div>
        <select
          name=""
          id=""
          onChange={handlechange}
          value={state.accountSelected}
        >
          {accounts.length &&
            accounts.map((acc, idx) => {
              return idx === 0 ? (
                <>
                  <option value={"Select some account"} key={"no-value"}>
                    {"Select an account"}
                  </option>
                  <option value={acc} key={idx + 1}>
                    {acc}
                  </option>
                </>
              ) : (
                <option value={acc} key={idx + 1}>
                  {acc}
                </option>
              );
            })}
        </select>
        <div>
          <button onClick={getInfoVoter}>Get Info of last voter!</button>
        </div>
        <div>
          {state.accountSelected.length !== 0 && (
            <form action="" onSubmit={register} ref={ref}>
              <h4>
                Registering voter for account:{" "}
                {state.accountSelected.length && state.accountSelected}
              </h4>
              <input
                name="name"
                type="text"
                placeholder="name"
                onChange={handleInputChange}
              />
              <input
                name="lastname"
                type="text"
                placeholder="lastname"
                onChange={handleInputChange}
              />
              <input
                name="email"
                type="text"
                placeholder="email"
                onChange={handleInputChange}
              />
              <button type="submit">Register Voter!</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
