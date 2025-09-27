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
// Sample properties data with admin status
const propertiesData = [
  {
    id: "1",
    title: "Luxury Apartment Complex",
    location: "Miami, FL",
    valuation: "$12,500,000",
    status: "Active",
    submittedBy: "0x7c23...9f12",
    submittedDate: "2023-05-15",
    approvedDate: "2023-05-18",
    fundingProgress: 68,
  },
  {
    id: "2",
    title: "Commercial Office Building",
    location: "New York, NY",
    valuation: "$28,750,000",
    status: "Active",
    submittedBy: "0x3a45...b8d7",
    submittedDate: "2023-04-22",
    approvedDate: "2023-04-25",
    fundingProgress: 42,
  },
  {
    id: "3",
    title: "Residential Development",
    location: "Austin, TX",
    valuation: "$8,200,000",
    status: "Pending",
    submittedBy: "0x9f01...2e34",
    submittedDate: "2023-06-01",
    approvedDate: null,
    fundingProgress: 0,
  },
  {
    id: "4",
    title: "Retail Shopping Center",
    location: "Chicago, IL",
    valuation: "$15,800,000",
    status: "Active",
    submittedBy: "0x7c23...9f12",
    submittedDate: "2023-03-10",
    approvedDate: "2023-03-12",
    fundingProgress: 87,
  },
  {
    id: "5",
    title: "Industrial Warehouse",
    location: "Seattle, WA",
    valuation: "$6,400,000",
    status: "Active",
    submittedBy: "0x8d34...1f78",
    submittedDate: "2023-05-05",
    approvedDate: "2023-05-07",
    fundingProgress: 24,
  },
  {
    id: "6",
    title: "Beachfront Hotel",
    location: "San Diego, CA",
    valuation: "$32,100,000",
    status: "Pending",
    submittedBy: "0x2b67...4d19",
    submittedDate: "2023-06-02",
    approvedDate: null,
    fundingProgress: 0,
  },
  {
    id: "7",
    title: "Downtown Loft",
    location: "New York, NY",
    valuation: "$4,300,000",
    status: "Pending",
    submittedBy: "0x5e23...8a11",
    submittedDate: "2023-06-03",
    approvedDate: null,
    fundingProgress: 0,
  },
  {
    id: "8",
    title: "Mountain Retreat",
    location: "Colorado",
    valuation: "$7,800,000",
    status: "Rejected",
    submittedBy: "0x1a34...7c98",
    submittedDate: "2023-05-25",
    approvedDate: null,
    fundingProgress: 0,
  },
];
export default function AdminProperties() {
  const { user } = useUser();
  const [filter, setFilter] = useState("all");
  const [properties, setProperties] = useState(propertiesData);
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
  const filteredProperties =
    filter === "all"
      ? properties
      : properties.filter(
          (p) => p.status.toLowerCase() === filter.toLowerCase()
        );
  const approveProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: "Active",
            approvedDate: new Date().toISOString().split("T")[0],
          };
        }
        return p;
      })
    );
  };
  const rejectProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: "Rejected",
          };
        }
        return p;
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
            Property Management
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
            Review and manage tokenized properties
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
          All Properties ({properties.length})
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("active")}
        >
          Active ({properties.filter((p) => p.status === "Active").length})
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("pending")}
        >
          Pending Approval (
          {properties.filter((p) => p.status === "Pending").length})
        </Button>
        <Button
          variant={filter === "rejected" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("rejected")}
        >
          Rejected ({properties.filter((p) => p.status === "Rejected").length})
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
              <th className="text-left py-3 px-4">Property</th>
              <th className="text-left py-3 px-4">Location</th>
              <th className="text-left py-3 px-4">Valuation</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Submitted By</th>
              <th className="text-left py-3 px-4">Submitted Date</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property, index) => (
              <motion.tr
                key={property.id}
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
                <td className="py-3 px-4">
                  <div className="font-medium">{property.title}</div>
                  <div className="text-xs text-muted-foreground">
                    ID: {property.id}
                  </div>
                </td>
                <td className="py-3 px-4">{property.location}</td>
                <td className="py-3 px-4">{property.valuation}</td>
                <td className="py-3 px-4">
                  <Badge
                    variant={
                      property.status === "Active"
                        ? "success"
                        : property.status === "Pending"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {property.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 font-mono text-xs">
                  {property.submittedBy}
                </td>
                <td className="py-3 px-4 text-sm">{property.submittedDate}</td>
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
                    {property.status === "Pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-500"
                          onClick={() => approveProperty(property.id)}
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
                          onClick={() => rejectProperty(property.id)}
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
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {filteredProperties.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-muted-foreground"
                >
                  No properties found matching the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}
