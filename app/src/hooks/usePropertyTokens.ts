"use client";

import { useQuery } from "@tanstack/react-query";

// Property Token types
export interface PropertyToken {
  id: string;
  propertyId: string;
  tokenId: string;
  totalSupply: string;
  availableSupply: string;
  price: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// API functions
const fetchPropertyToken = async (id: string): Promise<PropertyToken> => {
  const response = await fetch(`/api/property-tokens/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch property token");
  }
  return response.json();
};

// Hooks
export const usePropertyToken = (id: string) => {
  return useQuery({
    queryKey: ["property-tokens", id],
    queryFn: () => fetchPropertyToken(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};