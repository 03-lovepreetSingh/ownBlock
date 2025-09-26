"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useUser } from "../../context/user-context";
export default function AdminDashboard() {
  const { user } = useUser();
  // Simple admin check - in a real app this would be more robust
  const isAdmin = user && user.address?.startsWith("0xa");
  if (!user || !isAdmin) {
    return (
      <div className="px-4 py-16 flex flex-col items-center justify-center text-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this area
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="px-4 py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <motion.h1
            className="text-3xl font-bold tracking-tighter"
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
            Admin Dashboard
          </motion.h1>
          <motion.p
            className="text-muted-foreground"
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
            Platform management and analytics
          </motion.p>
        </div>
        <motion.div
          className="flex items-center gap-2"
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
          <Link href="/admin/properties">
            <Button variant="outline">Manage Properties</Button>
          </Link>
          <Link href="/admin/users">
            <Button>Manage Users</Button>
          </Link>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <CardHeader className="pb-2">
              <CardDescription>Total Properties</CardDescription>
              <CardTitle className="text-3xl">24</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                6 pending approval
              </p>
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
            <CardHeader className="pb-2">
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-3xl">1,482</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                +15% from last month
              </p>
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
            delay: 0.3,
          }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>KYC Verified</CardDescription>
              <CardTitle className="text-3xl">937</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                63% verification rate
              </p>
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
            delay: 0.4,
          }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Investment</CardDescription>
              <CardTitle className="text-3xl">$28.4M</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Across all properties
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest platform activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Property Submitted",
                    description: "New property submission from 0x8a23...45df",
                    time: "10 minutes ago",
                  },
                  {
                    action: "KYC Verification",
                    description:
                      "User 0x7b31...f2e1 completed KYC verification",
                    time: "25 minutes ago",
                  },
                  {
                    action: "Token Purchase",
                    description:
                      "User 0x3a12...c8d9 purchased 15 tokens of Luxury Apartment Complex",
                    time: "1 hour ago",
                  },
                  {
                    action: "Property Approved",
                    description:
                      "Commercial Office Building was approved by admin",
                    time: "2 hours ago",
                  },
                  {
                    action: "User Blacklisted",
                    description:
                      "User 0x9f12...a3b4 was blacklisted for suspicious activity",
                    time: "3 hours ago",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start pb-3 border-b last:border-0 last:pb-0"
                  >
                    <div>
                      <h4 className="font-medium">{activity.action}</h4>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
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
            delay: 0.3,
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Property Submissions (6)</h3>
                  <div className="space-y-2">
                    {[
                      "Beachfront Villa - Miami",
                      "Downtown Loft - New York",
                      "Mountain Retreat - Colorado",
                    ].map((property, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-muted rounded-md"
                      >
                        <span>{property}</span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
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
                              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                              <polyline points="16 6 12 2 8 6"></polyline>
                              <line x1="12" y1="2" x2="12" y2="15"></line>
                            </svg>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-green-500"
                          >
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
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500"
                          >
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
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Link
                      href="/admin/properties"
                      className="text-sm text-primary hover:underline block text-center mt-2"
                    >
                      View all pending properties
                    </Link>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">KYC Verifications (12)</h3>
                  <div className="space-y-2">
                    {["0x7c23...9f12", "0x3a45...b8d7", "0x9f01...2e34"].map(
                      (address, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-muted rounded-md"
                        >
                          <span className="font-mono text-sm">{address}</span>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-green-500"
                            >
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
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500"
                            >
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
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </Button>
                          </div>
                        </div>
                      )
                    )}
                    <Link
                      href="/admin/users"
                      className="text-sm text-primary hover:underline block text-center mt-2"
                    >
                      View all pending verifications
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
