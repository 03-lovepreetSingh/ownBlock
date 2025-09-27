"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
type KycStatus = "pending" | "verified" | "rejected";
interface User {
  id: string;
  address: string;
  kycStatus: KycStatus;
  investments: string[];
}
interface UserContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  completeKyc: () => void;
  isWhitelisted: () => boolean;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("tokenre-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = () => {
    // Simulate wallet connection
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      address: "0x" + Math.random().toString(36).substring(2, 14),
      kycStatus: "pending" as KycStatus,
      investments: [],
    };
    setUser(newUser);
    localStorage.setItem("tokenre-user", JSON.stringify(newUser));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("tokenre-user");
  };
  const completeKyc = () => {
    if (user) {
      const updatedUser = {
        ...user,
        kycStatus: "verified" as KycStatus,
      };
      setUser(updatedUser);
      localStorage.setItem("tokenre-user", JSON.stringify(updatedUser));
    }
  };
  const isWhitelisted = () => {
    return user?.kycStatus === "verified";
  };
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        completeKyc,
        isWhitelisted,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};