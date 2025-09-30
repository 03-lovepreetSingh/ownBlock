"use client";

import { useState, useEffect } from "react";
import { useWaitForTransactionReceipt, useDeployContract } from "wagmi";
import { parseGwei } from "viem";
import { abi } from "../contract/abi";
import { bytecode } from "@/contract/bytecode";

export interface DeployContractParams {
  name: string;
  symbol: string;
  assetPassportCID: string;
  maxHoldingBps: number; // basis points (e.g., 1000 = 10%)
  totalSupply?: string; // Total tokens to mint
  tokenPrice?: string; // Price per token
  minInvestment?: string; // Minimum investment amount
  gasLimit?: number; // Optional custom gas limit
  gasPrice?: string; // Optional custom gas price in gwei
}

export interface ContractDeploymentResult {
  contractAddress?: string;
  transactionHash?: string;
  isLoading: boolean;
  isSuccess: boolean;
  error?: Error;
}

// Using the actual contract bytecode from the compiled ERC3643Token contract

export const useContractDeployment = () => {
  const [deploymentResult, setDeploymentResult] =
    useState<ContractDeploymentResult>({
      isLoading: false,
      isSuccess: false,
    });

  const {
    deployContract: deployContractWagmi,
    data: hash,
    error,
    isPending,
  } = useDeployContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const deployContract = async (params: DeployContractParams) => {
    try {
      setDeploymentResult({
        isLoading: true,
        isSuccess: false,
      });

      // Deploy the contract with constructor parameters and custom gas configuration
      deployContractWagmi({
        abi: abi,
        bytecode: bytecode,
        args: [
          params.name,
          params.symbol,
          params.assetPassportCID,
          params.maxHoldingBps,
        ],
        gas: BigInt(params.gasLimit || 5000000), // Use custom gas limit or default to 5M
        gasPrice: parseGwei(params.gasPrice || "20"), // Use custom gas price or default to 20 gwei
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
      setDeploymentResult((prev) => ({
        ...prev,
        isLoading: true,
      }));
    }
  }, [isPending, isConfirming, deploymentResult.isLoading]);

  useEffect(() => {
    if (error && !deploymentResult.error) {
      setDeploymentResult((prev) => ({
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
