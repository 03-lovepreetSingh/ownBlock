"use client";

import { useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import contractABI from "@/contract/abi.json";

export interface DeployContractParams {
  name: string;
  symbol: string;
  assetPassportCID: string;
  maxHoldingBps: number; // basis points (e.g., 1000 = 10%)
}

export interface ContractDeploymentResult {
  contractAddress?: string;
  transactionHash?: string;
  isLoading: boolean;
  isSuccess: boolean;
  error?: Error;
}

export const useContractDeployment = () => {
  const [deploymentResult, setDeploymentResult] = useState<ContractDeploymentResult>({
    isLoading: false,
    isSuccess: false,
  });

  const { writeContract, data: hash, error, isPending } = useWriteContract();

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
      writeContract({
        abi: contractABI,
        bytecode: "0x", // This would need to be the actual bytecode
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

  // Update deployment result when transaction is confirmed
  if (isConfirmed && receipt && !deploymentResult.isSuccess) {
    setDeploymentResult({
      contractAddress: receipt.contractAddress || undefined,
      transactionHash: receipt.transactionHash,
      isLoading: false,
      isSuccess: true,
    });
  }

  // Update loading state
  if ((isPending || isConfirming) && !deploymentResult.isLoading) {
    setDeploymentResult(prev => ({
      ...prev,
      isLoading: true,
    }));
  }

  // Update error state
  if (error && !deploymentResult.error) {
    setDeploymentResult(prev => ({
      ...prev,
      isLoading: false,
      error,
    }));
  }

  return {
    deployContract,
    ...deploymentResult,
    transactionHash: hash,
    isConfirming,
  };
};