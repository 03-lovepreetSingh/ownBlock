"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Dividend types
export interface Dividend {
  id: string;
  propertyTokenId: string;
  amount: string;
  recordDate: string;
  paymentDate: string;
  status: "pending" | "paid" | "cancelled";
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface DividendPayment {
  id: string;
  dividendId: string;
  userId: string;
  amount: string;
  status: "pending" | "paid" | "failed";
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDividendData {
  propertyTokenId: string;
  amount: string;
  recordDate: string;
  paymentDate: string;
  metadata?: Record<string, any>;
}

export interface CreateDividendPaymentData {
  dividendId: string;
  userId: string;
  amount: string;
  metadata?: Record<string, any>;
}

// API functions
const fetchDividendsByProperty = async (propertyTokenId: string): Promise<Dividend[]> => {
  const response = await fetch(`/api/dividends?propertyTokenId=${propertyTokenId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch dividends");
  }
  return response.json();
};

const createDividend = async (data: CreateDividendData): Promise<Dividend> => {
  const response = await fetch("/api/dividends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create dividend");
  }
  return response.json();
};

const createDividendPayment = async (data: CreateDividendPaymentData): Promise<DividendPayment> => {
  const response = await fetch("/api/dividend-payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create dividend payment");
  }
  return response.json();
};

// Hooks
export const useDividendsByProperty = (propertyTokenId: string) => {
  return useQuery({
    queryKey: ["dividends", propertyTokenId],
    queryFn: () => fetchDividendsByProperty(propertyTokenId),
    enabled: !!propertyTokenId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateDividend = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createDividend,
    onSuccess: (newDividend) => {
      queryClient.invalidateQueries({ queryKey: ["dividends", newDividend.propertyTokenId] });
    },
  });
};

export const useCreateDividendPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createDividendPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dividend-payments"] });
    },
  });
};