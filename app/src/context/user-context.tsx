"use client";
import React, { createContext, useContext } from "react";
import { SessionProvider } from "next-auth/react";
import { useAuth } from "@/hooks/useAuth";

interface UserProviderProps {
  children: React.ReactNode;
  session: any;
}

const UserContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <UserContext.Provider value={auth}>
      {children}
    </UserContext.Provider>
  );
}

export function UserProvider({ children, session }: UserProviderProps) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        {children}
      </UserContextProvider>
    </SessionProvider>
  );
}
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  
  // Provide backward compatibility with existing code
  const user = context.userProfile ? {
    id: context.userProfile.id,
    address: context.userProfile.address,
    kycStatus: context.userProfile.kycStatus,
    investments: [], // This will be fetched separately
  } : null;
  
  return {
    user,
    login: context.signIn,
    logout: context.signOut,
    completeKyc: () => {
      // This will be implemented when we connect KYC API
      console.log("KYC completion will be implemented with KYC API");
    },
    isWhitelisted: () => context.userProfile?.kycStatus === "verified",
    // Add new auth methods for direct access
    isAuthenticated: context.isAuthenticated,
    isLoading: context.isLoading,
    signIn: context.signIn,
    signOut: context.signOut,
    userProfile: context.userProfile,
    updateProfile: context.updateProfile,
  };
};