"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// KYC types
export interface KYCRecord {
  id: string;
  userId: string;
  status: "pending" | "approved" | "rejected";
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  idNumber: string;
  idType: "passport" | "national_id" | "driver_license";
  idDocumentUrl: string;
  proofOfAddressUrl: string;
  selfieUrl: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  rejectionReason?: string;
}

export interface CreateKYCData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  idNumber: string;
  idType: KYCRecord["idType"];
  idDocumentUrl: string;
  proofOfAddressUrl: string;
  selfieUrl: string;
  metadata?: Record<string, any>;
}

export interface UpdateKYCStatusData {
  status: "approved" | "rejected";
  metadata?: Record<string, any>;
}

// API functions
const fetchUserKYC = async (): Promise<KYCRecord> => {
  const response = await fetch("/api/kyc/me");
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("KYC record not found");
    }
    throw new Error("Failed to fetch KYC record");
  }
  return response.json();
};

const createKYC = async (data: CreateKYCData): Promise<KYCRecord> => {
  const response = await fetch("/api/kyc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create KYC record");
  }
  return response.json();
};

const fetchPendingKYCs = async (): Promise<KYCRecord[]> => {
  const response = await fetch("/api/kyc?status=pending");
  if (!response.ok) {
    throw new Error("Failed to fetch pending KYCs");
  }
  return response.json();
};

const updateKYCStatus = async ({ id, data }: { id: string; data: UpdateKYCStatusData }): Promise<KYCRecord> => {
  const response = await fetch(`/api/kyc/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update KYC status");
  }
  return response.json();
};

// Hooks
export const useUserKYC = () => {
  return useQuery({
    queryKey: ["kyc", "me"],
    queryFn: fetchUserKYC,
    retry: false, // Don't retry on 404
  });
};

export const useCreateKYC = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createKYC,
    onSuccess: (newKYC) => {
      queryClient.setQueryData(["kyc", "me"], newKYC);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};

export const usePendingKYCs = () => {
  return useQuery({
    queryKey: ["kyc", "pending"],
    queryFn: fetchPendingKYCs,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateKYCStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateKYCStatus,
    onSuccess: (updatedKYC) => {
      queryClient.setQueryData(["kyc", "me"], updatedKYC);
      queryClient.invalidateQueries({ queryKey: ["kyc", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};