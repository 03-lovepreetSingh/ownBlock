"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TokenizePropertyData {
  contractAddress: string;
  deploymentTxHash: string;
}

const tokenizeProperty = async (propertyId: string, data: TokenizePropertyData) => {
  const response = await fetch(`/api/properties/${propertyId}/tokenize`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to tokenize property");
  }

  return response.json();
};

export const useTokenizeProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId, data }: { propertyId: string; data: TokenizePropertyData }) =>
      tokenizeProperty(propertyId, data),
    onSuccess: () => {
      // Invalidate and refetch properties
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};