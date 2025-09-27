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
import { useUserInvestments } from "../../hooks/useInvestments";
import { useUserKYC } from "../../hooks/useKYC";
import Link from "next/link";
// Real investment data is now loaded from API
export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useUser();
  const { data: investments, isLoading: investmentsLoading, error: investmentsError } = useUserInvestments();
  const { data: kycRecord, isLoading: kycLoading } = useUserKYC();

  if (authLoading) {
    return (
      <div className="container px-4 py-16 flex flex-col items-center justify-center text-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>
              Please wait while we load your dashboard
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-16 flex flex-col items-center justify-center text-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You need to sign in to view your dashboard
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
            {kycLoading ? (
              <Badge variant="outline">Loading...</Badge>
            ) : kycRecord?.status === "approved" ? (
              <Badge variant="success">Verified</Badge>
            ) : kycRecord?.status === "rejected" ? (
              <Badge variant="destructive">Rejected</Badge>
            ) : kycRecord?.status === "pending" ? (
              <Badge variant="outline">Pending</Badge>
            ) : (
              <Badge variant="outline">Not Started</Badge>
            )}
          </div>
          {(!kycRecord || kycRecord.status === "rejected") && (
            <Link href="/kyc">
              <Button variant="outline" size="sm">
                {kycRecord?.status === "rejected" ? "Retry KYC" : "Complete KYC"}
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
              <CardTitle className="text-3xl">
                {investmentsLoading ? "Loading..." : investmentsError ? "Error" : 
                  investments ? `$${investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0).toLocaleString()}` : "$0"
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {investments ? `Across ${investments.length} properties` : "No investments yet"}
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
              <CardTitle className="text-3xl">
                {investmentsLoading ? "Loading..." : investmentsError ? "Error" : 
                  investments ? investments.reduce((sum, inv) => sum + parseFloat(inv.tokenAmount), 0).toLocaleString() : "0"
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {investments && investments.length > 0 ? 
                  `Avg. price: $${(investments.reduce((sum, inv) => sum + parseFloat(inv.price), 0) / investments.length).toFixed(2)} per token` : 
                  "No tokens yet"
                }
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
              <CardDescription>Account Status</CardDescription>
              <CardTitle className="text-lg">{user?.email || user?.name || "Connected"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Signed in with Google
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Investments</h2>
        {investmentsLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading your investments...</p>
          </div>
        ) : investmentsError ? (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading investments: {investmentsError.message}</p>
          </div>
        ) : !investments || investments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You don't have any investments yet.</p>
            <Link href="/marketplace">
              <Button className="mt-4">Browse Properties</Button>
            </Link>
          </div>
        ) : (
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
                        src="https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=800&auto=format&fit=crop"
                        alt="Property"
                        className="h-full w-full object-cover rounded-l-lg"
                      />
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-bold">Property Token #{investment.propertyTokenId}</h3>
                      <p className="text-sm text-muted-foreground">
                        Investment ID: {investment.id}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Tokens</p>
                          <p className="font-medium">{parseFloat(investment.tokenAmount).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Value</p>
                          <p className="font-medium">${parseFloat(investment.amount).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Status</span>
                          <span className="capitalize">{investment.status}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              investment.status === 'confirmed' ? 'bg-green-500' : 
                              investment.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{
                              width: investment.status === 'confirmed' ? '100%' : 
                                     investment.status === 'pending' ? '60%' : '100%',
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
        )}
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
