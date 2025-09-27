"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Property types
export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  propertyType: "residential" | "commercial" | "industrial" | "retail";
  valuation: string;
  images: string[];
  features: string[];
  yearBuilt?: number;
  squareFootage?: number;
  occupancyRate?: string;
  projectedAnnualReturn?: string;
  managementFee?: string;
  dividendFrequency?: "monthly" | "quarterly" | "annually";
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: "draft" | "active" | "funded" | "closed";
  createdAt: string;
  updatedAt: string;
  // Token information
  tokenId?: string;
  tokenSymbol?: string;
  totalSupply?: number;
  availableSupply?: number;
  tokenPrice?: string;
  minInvestment?: number;
  contractAddress?: string;
  fundingProgress?: string;
  tokenStandard?: string;
}

export interface CreatePropertyData {
  title: string;
  description: string;
  location: string;
  propertyType: Property["propertyType"];
  valuation: string;
  images: string[];
  features?: string[];
  yearBuilt?: number;
  squareFootage?: number;
  occupancyRate?: string;
  projectedAnnualReturn?: string;
  managementFee?: string;
  dividendFrequency?: Property["dividendFrequency"];
  address?: Property["address"];
}

// API functions
const fetchProperties = async (): Promise<Property[]> => {
  const response = await fetch("/api/properties");
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  const result = await response.json();
  return result.data; // Extract data from the API response wrapper
};

const fetchProperty = async (id: string): Promise<Property> => {
  const response = await fetch(`/api/properties/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }
  const result = await response.json();
  return result.data; // Extract data from the API response wrapper
};

const createProperty = async (data: CreatePropertyData): Promise<Property> => {
  const response = await fetch("/api/properties/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create property");
  }
  const result = await response.json();
  return result.data; // Extract data from the API response wrapper
};

// Hooks
export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchProperty(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProperty,
    onSuccess: (newProperty) => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      return newProperty;
    },
  });
};