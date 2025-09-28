"use client";

import { useState, useEffect } from "react";
import { useWaitForTransactionReceipt, useDeployContract } from "wagmi";
import { parseEther } from "viem";
import contractABI from "@/contract/abi.json";

export interface DeployContractParams {
  name: string;
  symbol: string;
  assetPassportCID: string;
  maxHoldingBps: number; // basis points (e.g., 1000 = 10%)
  totalSupply?: string; // Total tokens to mint
  tokenPrice?: string; // Price per token
  minInvestment?: string; // Minimum investment amount
}

export interface ContractDeploymentResult {
  contractAddress?: string;
  transactionHash?: string;
  isLoading: boolean;
  isSuccess: boolean;
  error?: Error;
}

// Contract bytecode - This would normally come from compilation
// For now, using a placeholder that indicates the contract needs to be compiled
const CONTRACT_BYTECODE = "0x608060405234801561001057600080fd5b50604051610c38380380610c388339818101604052810190610032919061007a565b8181600390805190602001906100499291906100d7565b5080600490805190602001906100609291906100d7565b50505050610166565b600080fd5b600080fd5b600080fd5b600080fd5b6000815190506100848161015f565b92915050565b6000602082840312156100a05761009f610070565b5b60006100ae84828501610075565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061012557607f821691505b602082108103610138576101376100de565b5b50919050565b61016881610154565b811461017357600080fd5b50565b610ac3806101856000396000f3fe"; // Placeholder bytecode

export const useContractDeployment = () => {
  const [deploymentResult, setDeploymentResult] = useState<ContractDeploymentResult>({
    isLoading: false,
    isSuccess: false,
  });

  const { deployContract: deployContractWagmi, data: hash, error, isPending } = useDeployContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed, data: receipt } = 
    useWaitForTransactionReceipt({
      hash,
    });

  const deployContract = async (params: DeployContractParams) => {
    try {
      setDeploymentResult({
        isLoading: true,
        isSuccess: false,
      });

      // Deploy the contract with constructor parameters
      deployContractWagmi({
        abi: contractABI,
        bytecode: CONTRACT_BYTECODE,
        args: [
          params.name,
          params.symbol,
          params.assetPassportCID,
          params.maxHoldingBps,
        ],
      });

    } catch (err) {
      setDeploymentResult({
        isLoading: false,
        isSuccess: false,
        error: err as Error,
      });
    }
  };

  // Use useEffect to handle state updates properly
  useEffect(() => {
    if (isConfirmed && receipt && !deploymentResult.isSuccess) {
      setDeploymentResult({
        contractAddress: receipt.contractAddress || undefined,
        transactionHash: receipt.transactionHash,
        isLoading: false,
        isSuccess: true,
      });
    }
  }, [isConfirmed, receipt, deploymentResult.isSuccess]);

  useEffect(() => {
    if ((isPending || isConfirming) && !deploymentResult.isLoading) {
      setDeploymentResult(prev => ({
        ...prev,
        isLoading: true,
      }));
    }
  }, [isPending, isConfirming, deploymentResult.isLoading]);

  useEffect(() => {
    if (error && !deploymentResult.error) {
      setDeploymentResult(prev => ({
        ...prev,
        isLoading: false,
        error,
      }));
    }
  }, [error, deploymentResult.error]);

  return {
    deployContract,
    ...deploymentResult,
    transactionHash: hash,
    isConfirming,
  };
};