"use client";

import { useQuery } from "@tanstack/react-query";

interface MarketplaceToken {
  id: string;
  title: string;
  description: string;
  location: string;
  propertyType: string;
  valuation: string;
  images: string[];
  contractAddress: string;
  deploymentTxHash: string;
  isTokenized: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface MarketplaceTokensResponse {
  tokens: MarketplaceToken[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

interface UseMarketplaceTokensParams {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const fetchMarketplaceTokens = async (params: UseMarketplaceTokensParams): Promise<MarketplaceTokensResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.offset) searchParams.set("offset", params.offset.toString());
  if (params.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  const response = await fetch(`/api/marketplace/tokens?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch marketplace tokens");
  }
  
  return response.json();
};

export const useMarketplaceTokens = (params: UseMarketplaceTokensParams = {}) => {
  return useQuery({
    queryKey: ["marketplace-tokens", params],
    queryFn: () => fetchMarketplaceTokens(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to fetch a specific token by contract address
const fetchTokenByContract = async (contractAddress: string): Promise<{ token: MarketplaceToken }> => {
  const response = await fetch(`/api/marketplace/tokens/${contractAddress}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch token details");
  }
  
  return response.json();
};

export const useTokenByContract = (contractAddress: string) => {
  return useQuery({
    queryKey: ["marketplace-token", contractAddress],
    queryFn: () => fetchTokenByContract(contractAddress),
    enabled: !!contractAddress && /^0x[a-fA-F0-9]{40}$/.test(contractAddress),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};