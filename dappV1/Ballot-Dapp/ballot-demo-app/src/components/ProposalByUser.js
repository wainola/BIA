import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App";

const ProposalsByUser = ({ web3, accounts, contractInstance, ...rest }) => {
  const context = useContext(Context);
  const [voter, setVoter] = useState(null);
  const [account, setAccount] = useState(null);
  const [proposals, setProposals] = useState([]);

  console.log("...rest", rest);

  const getOwnProposals = async () => {
    const { deployedInstance } = contractInstance;
    const {
      ballotContext: { accountSelected },
    } = context;
    try {
      const proposals = await deployedInstance.getOwnProposals({
        from: accountSelected,
      });
      const proposalMaped = proposals.map((proposal) => {
        const [title, description, votes, weight] = proposal;
        const weightOnEther = web3.utils.fromWei(weight, "ether");
        return { title, description, votes, weight: weightOnEther };
      });
      setProposals(proposalMaped);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (context.ballotContext && context.ballotContext.accountSelected) {
      const {
        ballotContext: { accountSelected, lastVoterInfo },
      } = context;
      getOwnProposals();
      setVoter(lastVoterInfo);
      setAccount(accountSelected);
    }
  }, []);

  return (
    <div>
      {voter !== null && Object.keys(voter).length !== 0 && (
        <>
          <div>
            <h2>
              Proposals for {voter.name} {voter.lastname}
            </h2>
            <div>Account number {account}</div>
          </div>
        </>
      )}
      {proposals.length !== 0 && (
        <div>
          {proposals.map((proposal) => (
            <div>
              <p>{proposal.title}</p>
              <p>
                Description: {proposal.description} - votes: {proposal.votes} -
                weight: {proposal.weight} ETH
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProposalsByUser;
