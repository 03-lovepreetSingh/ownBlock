"use client";

import React, { useState } from "react";
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

export default function ProfilePage() {
  const { user, isWhitelisted, logout } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...personalInfo,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPersonalInfo(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
      type: "success",
    });
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
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      />
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
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </h3>
                        <p>{personalInfo.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Email Address
                        </h3>
                        <p>{personalInfo.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Phone Number
                        </h3>
                        <p>{personalInfo.phone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Country
                        </h3>
                        <p>{personalInfo.country}</p>
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
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your account settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your investments
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailNotifications"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label
                        htmlFor="emailNotifications"
                        className="ml-2 text-sm"
                      >
                        Enabled
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Setup 2FA
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Language</h3>
                      <p className="text-sm text-muted-foreground">
                        Select your preferred language
                      </p>
                    </div>
                    <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="space-y-8">
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
                <CardTitle>Wallet Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Connected Wallet
                    </h3>
                    <p className="font-mono text-sm break-all">
                      {user.address}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      KYC Status
                    </h3>
                    <div className="flex items-center mt-1">
                      {isWhitelisted() ? (
                        <>
                          <Badge variant="success" className="mr-2">
                            Verified
                          </Badge>
                          <span className="text-sm">
                            Your identity has been verified
                          </span>
                        </>
                      ) : (
                        <>
                          <Badge variant="outline" className="mr-2">
                            Pending
                          </Badge>
                          <span className="text-sm">Verification required</span>
                        </>
                      )}
                    </div>
                  </div>
                  {!isWhitelisted() && (
                    <Button
                      onClick={() => router.push("/kyc")}
                      className="w-full"
                    >
                      Complete KYC
                    </Button>
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
