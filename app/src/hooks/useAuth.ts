"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// User profile types
interface UserProfile {
  id: string;
  email: string;
  address: string;
  kycStatus: "pending" | "verified" | "rejected";
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

interface UpdateProfileData {
  address?: string;
}

// API functions
const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await fetch("/api/users/me");
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return response.json();
};

const updateUserProfile = async (data: UpdateProfileData): Promise<UserProfile> => {
  const response = await fetch("/api/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }
  return response.json();
};

// Auth hook
export const useAuth = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  // User profile query
  const { data: userProfile, isLoading: isLoadingProfile, error: profileError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: !!session, // Only fetch if user is authenticated
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["userProfile"], updatedProfile);
    },
  });

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading" || isLoadingProfile;

  return {
    // Auth state
    session,
    isAuthenticated,
    isLoading,
    
    // User profile
    userProfile,
    profileError,
    
    // Auth actions
    signIn: () => signIn("google"),
    signOut: () => signOut(),
    
    // Profile actions
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error,
  };
};