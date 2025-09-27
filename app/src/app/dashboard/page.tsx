"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useUser } from "../../context/user-context";
import Link from "next/link";
// Sample investment data
const investments = [
  {
    id: "1",
    property: "Luxury Apartment Complex",
    location: "Miami, FL",
    tokens: 25,
    tokenPrice: "$500",
    totalValue: "$12,500",
    fundingProgress: 68,
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    property: "Retail Shopping Center",
    location: "Chicago, IL",
    tokens: 15,
    tokenPrice: "$650",
    totalValue: "$9,750",
    fundingProgress: 87,
    image:
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=800&auto=format&fit=crop",
  },
];
export default function DashboardPage() {
  const { user, isWhitelisted } = useUser();
  if (!user) {
    return (
      <div className="container px-4 py-16 flex flex-col items-center justify-center text-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You need to connect your wallet to view your dashboard
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }
  return (
    <div className="container px-4 py-12 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
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
            Investor Dashboard
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
            Manage your tokenized real estate investments
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
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">KYC Status:</span>
            {isWhitelisted() ? (
              <Badge variant="success">Verified</Badge>
            ) : (
              <Badge variant="outline">Pending</Badge>
            )}
          </div>
          {!isWhitelisted() && (
            <Link href="/kyc">
              <Button variant="outline" size="sm">
                Complete KYC
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
              <CardDescription>Total Investment Value</CardDescription>
              <CardTitle className="text-3xl">$22,250</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Across 2 properties
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
              <CardDescription>Total Tokens</CardDescription>
              <CardTitle className="text-3xl">40</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Avg. price: $556.25 per token
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
              <CardDescription>Wallet Address</CardDescription>
              <CardTitle className="text-lg truncate">{user.address}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connected via MetaMask
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Investments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investments.map((investment, index) => (
            <motion.div
              key={investment.id}
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
                delay: 0.1 * (index + 1),
              }}
            >
              <Card>
                <div className="flex">
                  <div className="w-1/3">
                    <img
                      src={investment.image}
                      alt={investment.property}
                      className="h-full w-full object-cover rounded-l-lg"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <h3 className="font-bold">{investment.property}</h3>
                    <p className="text-sm text-muted-foreground">
                      {investment.location}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Tokens</p>
                        <p className="font-medium">{investment.tokens}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Value</p>
                        <p className="font-medium">{investment.totalValue}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Funding Progress</span>
                        <span>{investment.fundingProgress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${investment.fundingProgress}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
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
          delay: 0.5,
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Explore More Properties</CardTitle>
            <CardDescription>
              Discover new investment opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Diversify your portfolio with more tokenized real estate
              investments.
            </p>
            <Link href="/marketplace">
              <Button>Browse Marketplace</Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
const CardFooter = ({ children }) => (
  <div className="flex items-center p-6 pt-0">{children}</div>
);
