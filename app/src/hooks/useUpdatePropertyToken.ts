"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdatePropertyTokenData {
  tokenAddress: string;
}

const updatePropertyToken = async (tokenId: string, data: UpdatePropertyTokenData) => {
  const response = await fetch(`/api/property-tokens/${tokenId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update property token");
  }
  
  const result = await response.json();
  return result.data;
};

export const useUpdatePropertyToken = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ tokenId, data }: { tokenId: string; data: UpdatePropertyTokenData }) =>
      updatePropertyToken(tokenId, data),
    onSuccess: (updatedToken) => {
      queryClient.invalidateQueries({ queryKey: ["property-tokens"] });
      queryClient.invalidateQueries({ queryKey: ["property-tokens", updatedToken.id] });
      return updatedToken;
    },
  });
};