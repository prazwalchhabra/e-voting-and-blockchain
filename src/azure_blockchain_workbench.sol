pragma solidity ^0.4.20;


contract WorkbenchBase {

    event WorkbenchContractCreated(string applicationName, string workflowName, address originatingAddress);
    event WorkbenchContractUpdated(string applicationName, string workflowName, string action, address originatingAddress);

    string internal ApplicationName;
    string internal WorkflowName;

    function WorkbenchBase(string applicationName, string workflowName) internal {
        ApplicationName = applicationName;
        WorkflowName = workflowName;
    }

    function ContractCreated() internal {
        WorkbenchContractCreated(ApplicationName, WorkflowName, msg.sender);
    }

    function ContractUpdated(string action) internal {
        WorkbenchContractUpdated(ApplicationName, WorkflowName, action, msg.sender);
    }
}

contract Voting {
 
  mapping (bytes32 => uint8) public votesReceived;
 
  bytes32[] public candidateList;
  address public Voter;
  address public Authoriser;
  address public EVM;
  address public Constituency;

  // constructor function
  function VoteConstructor(bytes32[] candidateNames, string voter, string evm, string constituency) public
  {
      Authoriser = msg.sender;
      candidateList = candidateNames;
      EVM  = evm;
      Voter = voter;
      Constituency = constituency;
      ContractCreated();
  }

  function totalVotesFor(bytes32 candidate) returns (uint8) {
    if (Authoriser != msg.sender){
      revert();
    }
    if (validCandidate(candidate) == false) throw;
    return votesReceived[candidate];
  }

  function voteForCandidate(bytes32 candidate) {
    if (Authoriser != msg.sender){
      revert();
    }

    if (validCandidate(candidate) == false) throw;
    votesReceived[candidate] += 1;
  }

  function validCandidate(bytes32 candidate) returns (bool) {
    if (Authoriser != msg.sender){
      revert();
    }
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }
}