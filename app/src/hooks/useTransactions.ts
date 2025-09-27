"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

// Transaction types
export interface Transaction {
  id: string;
  userId: string;
  propertyTokenId: string;
  type: "investment" | "trade" | "dividend" | "fee";
  amount: string;
  tokenAmount: string;
  price: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionData {
  propertyTokenId: string;
  type: Transaction["type"];
  amount: string;
  tokenAmount: string;
  price: string;
  metadata?: Record<string, any>;
}

// API functions
const createTransaction = async (data: CreateTransactionData): Promise<Transaction> => {
  const response = await fetch("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }
  return response.json();
};

// Hooks
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["investments", "me"] });
    },
  });
};