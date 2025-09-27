"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { useUser } from "../../../context/user-context";
// Sample users data
const usersData = [
  {
    id: "1",
    address: "0x7c23...9f12",
    kycStatus: "verified",
    joinedDate: "2023-04-15",
    totalInvestment: "$25,750",
    properties: 2,
    blacklisted: false,
  },
  {
    id: "2",
    address: "0x3a45...b8d7",
    kycStatus: "verified",
    joinedDate: "2023-03-22",
    totalInvestment: "$12,000",
    properties: 1,
    blacklisted: false,
  },
  {
    id: "3",
    address: "0x9f01...2e34",
    kycStatus: "pending",
    joinedDate: "2023-06-01",
    totalInvestment: "$0",
    properties: 0,
    blacklisted: false,
  },
  {
    id: "4",
    address: "0x8d34...1f78",
    kycStatus: "verified",
    joinedDate: "2023-02-10",
    totalInvestment: "$45,200",
    properties: 3,
    blacklisted: false,
  },
  {
    id: "5",
    address: "0x2b67...4d19",
    kycStatus: "rejected",
    joinedDate: "2023-05-25",
    totalInvestment: "$0",
    properties: 0,
    blacklisted: true,
  },
  {
    id: "6",
    address: "0x5e23...8a11",
    kycStatus: "pending",
    joinedDate: "2023-06-02",
    totalInvestment: "$0",
    properties: 0,
    blacklisted: false,
  },
  {
    id: "7",
    address: "0x1a34...7c98",
    kycStatus: "verified",
    joinedDate: "2023-01-15",
    totalInvestment: "$8,500",
    properties: 1,
    blacklisted: false,
  },
  {
    id: "8",
    address: "0x6f45...2d87",
    kycStatus: "pending",
    joinedDate: "2023-06-03",
    totalInvestment: "$0",
    properties: 0,
    blacklisted: false,
  },
];
export default function AdminUsers() {
  const { user } = useUser();
  const [filter, setFilter] = useState("all");
  const [users, setUsers] = useState(usersData);
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
  let filteredUsers = users;
  if (filter === "verified") {
    filteredUsers = users.filter((u) => u.kycStatus === "verified");
  } else if (filter === "pending") {
    filteredUsers = users.filter((u) => u.kycStatus === "pending");
  } else if (filter === "rejected") {
    filteredUsers = users.filter((u) => u.kycStatus === "rejected");
  } else if (filter === "blacklisted") {
    filteredUsers = users.filter((u) => u.blacklisted);
  }
  const approveKyc = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            kycStatus: "verified",
          };
        }
        return u;
      })
    );
  };
  const rejectKyc = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            kycStatus: "rejected",
          };
        }
        return u;
      })
    );
  };
  const toggleBlacklist = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            blacklisted: !u.blacklisted,
          };
        }
        return u;
      })
    );
  };
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
            User Management
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
            Manage users and KYC verifications
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
          <Link href="/admin">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="flex flex-wrap gap-2 mb-6"
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
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All Users ({users.length})
        </Button>
        <Button
          variant={filter === "verified" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("verified")}
        >
          Verified ({users.filter((u) => u.kycStatus === "verified").length})
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("pending")}
        >
          Pending KYC ({users.filter((u) => u.kycStatus === "pending").length})
        </Button>
        <Button
          variant={filter === "rejected" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("rejected")}
        >
          Rejected ({users.filter((u) => u.kycStatus === "rejected").length})
        </Button>
        <Button
          variant={filter === "blacklisted" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("blacklisted")}
        >
          Blacklisted ({users.filter((u) => u.blacklisted).length})
        </Button>
      </motion.div>
      <div className="overflow-x-auto">
        <motion.table
          className="w-full border-collapse"
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
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Wallet Address</th>
              <th className="text-left py-3 px-4">KYC Status</th>
              <th className="text-left py-3 px-4">Joined</th>
              <th className="text-left py-3 px-4">Total Investment</th>
              <th className="text-left py-3 px-4">Properties</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                className="border-b hover:bg-muted/50"
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 * (index % 10),
                }}
              >
                <td className="py-3 px-4 font-mono text-sm">{user.address}</td>
                <td className="py-3 px-4">
                  <Badge
                    variant={
                      user.kycStatus === "verified"
                        ? "success"
                        : user.kycStatus === "pending"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {user.kycStatus.charAt(0).toUpperCase() +
                      user.kycStatus.slice(1)}
                  </Badge>
                </td>
                <td className="py-3 px-4">{user.joinedDate}</td>
                <td className="py-3 px-4">{user.totalInvestment}</td>
                <td className="py-3 px-4">{user.properties}</td>
                <td className="py-3 px-4">
                  {user.blacklisted ? (
                    <Badge variant="destructive">Blacklisted</Badge>
                  ) : (
                    <Badge variant="outline">Active</Badge>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </Button>
                    {user.kycStatus === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-500"
                          onClick={() => approveKyc(user.id)}
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
                          onClick={() => rejectKyc(user.id)}
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
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 ${
                        user.blacklisted ? "text-green-500" : "text-red-500"
                      }`}
                      onClick={() => toggleBlacklist(user.id)}
                    >
                      {user.blacklisted ? (
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
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      ) : (
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
                          <path d="M3 3l18 18"></path>
                          <path d="M10.5 10.5L4 21h16l-6-10-3.5-.5z"></path>
                        </svg>
                      )}
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-muted-foreground"
                >
                  No users found matching the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}
