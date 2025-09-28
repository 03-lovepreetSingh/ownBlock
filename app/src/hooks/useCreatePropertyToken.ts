"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreatePropertyTokenData {
  propertyId: string;
  tokenSymbol: string;
  totalSupply: number;
  availableSupply: number;
  tokenPrice: number;
  minInvestment: number;
  contractAddress: string;
  tokenStandard?: string;
}

const createPropertyToken = async (data: CreatePropertyTokenData) => {
  const response = await fetch("/api/property-tokens/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create property token");
  }
  
  const result = await response.json();
  return result.data;
};

export const useCreatePropertyToken = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPropertyToken,
    onSuccess: (newPropertyToken) => {
      queryClient.invalidateQueries({ queryKey: ["property-tokens"] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      return newPropertyToken;
    },
  });
};