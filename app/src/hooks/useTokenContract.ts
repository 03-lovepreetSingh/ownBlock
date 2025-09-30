"use client";

import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import contractABI from "@/contract/abi";

export interface TokenContractHookProps {
  contractAddress: string;
}

export const useTokenContract = ({
  contractAddress,
}: TokenContractHookProps) => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Read contract functions
  const { data: name } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: contractABI,
    functionName: "name",
  });

  const { data: symbol } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: contractABI,
    functionName: "symbol",
  });

  const { data: totalSupply } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: contractABI,
    functionName: "totalSupply",
  });

  const { data: decimals } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: contractABI,
    functionName: "decimals",
  });

  // Write contract functions
  const mintTokens = async (to: string, amount: bigint) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: "mint",
      args: [to, amount],
    });
  };

  const verifyKYC = async (account: string) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: "verifyKYC",
      args: [account],
    });
  };

  const revokeKYC = async (account: string) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: "revokeKYC",
      args: [account],
    });
  };

  const addIssuer = async (account: string) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: "addIssuer",
      args: [account],
    });
  };

  const addComplianceOfficer = async (account: string) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: "addComplianceOfficer",
      args: [account],
    });
  };

  const updateAssetPassportCID = async (newCID: string) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: "updateAssetPassportCID",
      args: [newCID],
    });
  };

  const updateMaxHolding = async (newBps: bigint) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: "updateMaxHolding",
      args: [newBps],
    });
  };

  // Check functions
  const getBalanceOf = (account: string) => {
    return useReadContract({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: "balanceOf",
      args: [account],
    });
  };

  const isKYCVerified = (account: string) => {
    return useReadContract({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: "isKYCVerified",
      args: [account],
    });
  };

  const isTransferExempt = (account: string) => {
    return useReadContract({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: "isTransferExempt",
      args: [account],
    });
  };

  return {
    // Contract info
    name,
    symbol,
    totalSupply,
    decimals,

    // Write functions
    mintTokens,
    verifyKYC,
    revokeKYC,
    addIssuer,
    addComplianceOfficer,
    updateAssetPassportCID,
    updateMaxHolding,

    // Read functions
    getBalanceOf,
    isKYCVerified,
    isTransferExempt,

    // Transaction state
    transactionHash: hash,
    isLoading: isPending || isConfirming,
    isSuccess: isConfirmed,
    error,
  };
};
