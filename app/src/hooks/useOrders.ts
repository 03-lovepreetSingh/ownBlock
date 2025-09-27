"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Order types
export interface Order {
  id: string;
  userId: string;
  propertyTokenId: string;
  type: "buy" | "sell";
  amount: string;
  price: string;
  totalAmount: string;
  status: "pending" | "filled" | "cancelled";
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  propertyTokenId: string;
  type: Order["type"];
  amount: string;
  price: string;
  totalAmount: string;
  metadata?: Record<string, any>;
}

// API functions
const fetchOrdersByProperty = async (propertyTokenId: string): Promise<Order[]> => {
  const response = await fetch(`/api/order-book?propertyTokenId=${propertyTokenId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
};

const createOrder = async (data: CreateOrderData): Promise<Order> => {
  const response = await fetch("/api/order-book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create order");
  }
  return response.json();
};

// Hooks
export const useOrdersByProperty = (propertyTokenId: string) => {
  return useQuery({
    queryKey: ["orders", propertyTokenId],
    queryFn: () => fetchOrdersByProperty(propertyTokenId),
    enabled: !!propertyTokenId,
    staleTime: 30 * 1000, // 30 seconds for order book
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (newOrder) => {
      queryClient.invalidateQueries({ queryKey: ["orders", newOrder.propertyTokenId] });
    },
  });
};