"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useUser } from "../../context/user-context";
import { useToast } from "../../components/ui/toaster";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import {
  userProfileSchema,
  type UserProfileFormData,
} from "../../lib/validation";

// Helper function to get network name from chain ID
const getNetworkName = (chainId: number): string => {
  const networks: Record<number, string> = {
    1: "Ethereum Mainnet",
    42220: "Celo Mainnet",
    44787: "Celo Alfajores Testnet",
    137: "Polygon Mainnet",
    80001: "Polygon Mumbai Testnet",
    56: "BSC Mainnet",
    97: "BSC Testnet",
    43114: "Avalanche Mainnet",
    43113: "Avalanche Fuji Testnet",
    7777777: "Flow Testnet",
  };
  return networks[chainId] || `Unknown Network (${chainId})`;
};

export default function ProfilePage() {
  const { user, isWhitelisted, logout } = useUser();
  const { userProfile, updateProfile, isUpdatingProfile } = useAuth();
  const {
    walletInfo,
    connectWallet,
    disconnectWallet,
    isConnected,
    address,
    chainId,
  } = useWallet();
  const router = useRouter();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfileFormData>({
    name: "",
    phone: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Update form data when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        phone: userProfile.phone || "",
        address: userProfile.address || "",
      });
    }
  }, [userProfile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      const validatedData = userProfileSchema.parse(formData);

      await updateProfile(validatedData);
      setIsEditing(false);
      setFormErrors({});
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
        type: "success",
      });
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const errors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setFormErrors(errors);
      } else {
        toast({
          title: "Update Failed",
          description: "Failed to update profile. Please try again.",
          type: "error",
        });
      }
    }
  };
  if (!user) {
    return (
      <div className="px-4 py-16 flex flex-col items-center justify-center text-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You need to connect your wallet to view your profile
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/")}>Return to Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  return (
    <div className="px-4 py-12 md:py-16">
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        User Profile
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full h-10 px-3 rounded-md border bg-background ${
                          formErrors.name ? "border-red-500" : "border-input"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.name && (
                        <p className="text-sm text-red-500 mt-1">
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full h-10 px-3 rounded-md border bg-background ${
                          formErrors.phone ? "border-red-500" : "border-input"
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {formErrors.phone && (
                        <p className="text-sm text-red-500 mt-1">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full h-10 px-3 rounded-md border bg-background ${
                          formErrors.address ? "border-red-500" : "border-input"
                        }`}
                        placeholder="Enter your address"
                      />
                      {formErrors.address && (
                        <p className="text-sm text-red-500 mt-1">
                          {formErrors.address}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          // Reset form data to original values
                          if (userProfile) {
                            setFormData({
                              name: userProfile.name || "",
                              phone: userProfile.phone || "",
                              address: userProfile.address || "",
                            });
                          }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isUpdatingProfile}>
                        {isUpdatingProfile ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </h3>
                        <p>{userProfile?.name || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Email Address
                        </h3>
                        <p>{userProfile?.email || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Phone Number
                        </h3>
                        <p>{userProfile?.phone || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Address
                        </h3>
                        <p>{userProfile?.address || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          KYC Status
                        </h3>
                        <Badge
                          variant={
                            userProfile?.kycStatus === "verified"
                              ? "default"
                              : userProfile?.kycStatus === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {userProfile?.kycStatus || "Unknown"}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Account Role
                        </h3>
                        <Badge variant="outline">
                          {userProfile?.role || "User"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={() => setIsEditing(true)}>
                        Edit Information
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                  </svg>
                  Wallet Information
                </CardTitle>
                <CardDescription>
                  Your connected wallet and blockchain details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Connection Status */}
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      isConnected
                        ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isConnected
                            ? "bg-green-500 animate-pulse"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <h3
                          className={`text-sm font-medium ${
                            isConnected
                              ? "text-green-800 dark:text-green-200"
                              : "text-red-800 dark:text-red-200"
                          }`}
                        >
                          {isConnected
                            ? "Wallet Connected"
                            : "Wallet Disconnected"}
                        </h3>
                        <p
                          className={`text-xs ${
                            isConnected
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {isConnected
                            ? "Successfully connected to Web3 wallet"
                            : "Connect your wallet to access full features"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={isConnected ? "success" : "destructive"}
                        className={
                          isConnected
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }
                      >
                        {isConnected ? "Active" : "Inactive"}
                      </Badge>
                      {!isConnected && (
                        <Button
                          onClick={connectWallet}
                          size="sm"
                          variant="outline"
                          className="text-xs"
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Wallet Address */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 12l2 2 4-4"></path>
                        <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1"></path>
                        <path d="M3 13v6c0 .552.448 1 1 1h16c.552 0 1-.448 1-1v-6"></path>
                      </svg>
                      Wallet Address
                    </h3>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border">
                      <code className="font-mono text-sm flex-1 break-all">
                        {isConnected && address
                          ? address
                          : userProfile?.address || "No wallet connected"}
                      </code>
                      {(isConnected && address) || userProfile?.address ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const addressToCopy =
                              isConnected && address
                                ? address
                                : userProfile?.address;
                            if (addressToCopy) {
                              navigator.clipboard.writeText(addressToCopy);
                              toast({
                                title: "Copied!",
                                description:
                                  "Wallet address copied to clipboard",
                              });
                            }
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              width="14"
                              height="14"
                              x="8"
                              y="8"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                          </svg>
                        </Button>
                      ) : null}
                    </div>
                  </div>

                  {/* Network Information */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                      Network
                    </h3>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {isConnected && chainId
                              ? getNetworkName(chainId)
                              : "Celo Mainnet"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Chain ID:{" "}
                            {isConnected && chainId ? chainId : "42220"}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {isConnected ? "Connected" : "Mainnet"}
                      </Badge>
                    </div>
                  </div>

                  {/* Account Type */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      Account Type
                    </h3>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                      <div>
                        <p className="text-sm font-medium">
                          {isConnected
                            ? "Web3 Wallet Account"
                            : "OAuth Account"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isConnected
                            ? "Connected via Web3 wallet"
                            : "Authenticated via Google OAuth 2.0"}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {isConnected ? "Web3" : "Social Login"}
                      </Badge>
                    </div>
                  </div>

                  {/* Wallet Actions */}
                  {isConnected && (
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Wallet Actions
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Manage your wallet connection
                          </p>
                        </div>
                        <Button
                          onClick={disconnectWallet}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20"
                        >
                          Disconnect Wallet
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/dashboard")}
                >
                  View Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-destructive hover:bg-destructive/10"
                >
                  Delete Account
                </Button>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={logout}
                >
                  Disconnect Wallet
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
