"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Investment types
export interface Investment {
  id: string;
  userId: string;
  propertyTokenId: string;
  amount: string;
  tokenAmount: string;
  price: string;
  status: "pending" | "confirmed" | "cancelled";
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvestmentData {
  propertyTokenId: string;
  amount: string;
  tokenAmount: string;
  price: string;
  metadata?: Record<string, any>;
}

// API functions
const fetchUserInvestments = async (): Promise<Investment[]> => {
  const response = await fetch("/api/investments/me");
  if (!response.ok) {
    throw new Error("Failed to fetch user investments");
  }
  return response.json();
};

const createInvestment = async (data: CreateInvestmentData): Promise<Investment> => {
  const response = await fetch("/api/investments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create investment");
  }
  return response.json();
};

// Hooks
export const useUserInvestments = () => {
  return useQuery({
    queryKey: ["investments", "me"],
    queryFn: fetchUserInvestments,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateInvestment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createInvestment,
    onSuccess: (newInvestment) => {
      queryClient.invalidateQueries({ queryKey: ["investments", "me"] });
      return newInvestment;
    },
  });
};