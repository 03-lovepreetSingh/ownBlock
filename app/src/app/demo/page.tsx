"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Stepper } from "../../components/ui/stepper";
import { ComplianceBadge } from "../../components/compliance-badge";
import { Badge } from "../../components/ui/badge";
import { useUser } from "../../context/user-context";
import Link from "next/link";
// Demo steps
const steps = [
  {
    id: "connect",
    title: "Connect Wallet",
    description: "Start by connecting your wallet",
  },
  {
    id: "kyc",
    title: "KYC Verification",
    description: "Complete KYC to get whitelisted",
  },
  {
    id: "browse",
    title: "Browse Marketplace",
    description: "Explore available properties",
  },
  {
    id: "purchase",
    title: "Purchase Tokens",
    description: "Buy tokens with cUSD",
  },
  {
    id: "dashboard",
    title: "View Dashboard",
    description: "Manage your investments",
  },
];
export default function DemoPage() {
  const { user, login, logout, completeKyc, isWhitelisted } = useUser();
  const [currentStep, setCurrentStep] = useState("connect");
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const handleNextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      const currentIndex = steps.findIndex((step) => step.id === currentStep);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1].id);
      }
      setIsLoading(false);
    }, 1000);
  };
  const handleConnect = () => {
    setIsLoading(true);
    setTimeout(() => {
      login();
      setCurrentStep("kyc");
      setIsLoading(false);
    }, 1000);
  };
  const handleKyc = () => {
    setIsLoading(true);
    setTimeout(() => {
      completeKyc();
      setCurrentStep("browse");
      setIsLoading(false);
    }, 1500);
  };
  const handlePurchase = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPurchaseComplete(true);
      setCurrentStep("dashboard");
      setIsLoading(false);
    }, 1500);
  };
  return (
    <div className="px-4 py-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="text-center mb-12">
          <motion.h1
            className="text-3xl font-bold tracking-tight mb-4"
            initial={{
              opacity: 0,
              y: -20,
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
            OwnBlock Demo Walkthrough
          </motion.h1>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{
              opacity: 0,
              y: -20,
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
            Experience the complete flow of tokenized real estate investment
            with compliance enforcement at every step
          </motion.p>
        </div>
        <div className="mb-12">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <AnimatePresence mode="wait">
          {currentStep === "connect" && (
            <motion.div
              key="connect"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="bg-card border rounded-lg p-6"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
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
                </div>
              </div>
              <h2 className="text-xl font-bold text-center mb-2">
                Connect Your Wallet
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                Connect your wallet to get started with tokenized real estate
                investment
              </p>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <Button
                  onClick={handleConnect}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                      </svg>
                      Connect Wallet
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  By connecting your wallet, you agree to our Terms of Service
                  and Privacy Policy
                </p>
              </div>
            </motion.div>
          )}
          {currentStep === "kyc" && (
            <motion.div
              key="kyc"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="bg-card border rounded-lg p-6"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold text-center mb-2">
                Complete KYC Verification
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                KYC verification is required to comply with regulations and to
                be whitelisted for token transactions
              </p>
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg mb-6">
                <div className="flex items-start gap-3">
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
                    className="text-primary mt-1"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">
                      ERC-3643 Compliance
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Your identity will be verified via Self Protocol and
                      stored as a verifiable credential. This allows the
                      ERC-3643 smart contract to enforce transfer restrictions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <Button
                  onClick={handleKyc}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      Complete KYC with Self Protocol
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Your identity information will be handled securely and in
                  compliance with privacy regulations
                </p>
              </div>
            </motion.div>
          )}
          {currentStep === "browse" && (
            <motion.div
              key="browse"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="bg-card border rounded-lg p-6"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold text-center mb-2">
                Browse Marketplace
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                Explore available properties and select one to invest in
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  className="border rounded-lg overflow-hidden cursor-pointer bg-background"
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=800&auto=format&fit=crop"
                      alt="Luxury Apartment Complex"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          Luxury Apartment Complex
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Miami, FL
                        </p>
                      </div>
                      <Badge variant="outline">$12.5M</Badge>
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <span>$500 / token</span>
                      <span>68% funded</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{
                          width: "68%",
                        }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  className="border rounded-lg overflow-hidden cursor-pointer bg-background"
                  onClick={handleNextStep}
                >
                  <div className="h-36 overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1554435493-93422e8d1a41?q=80&w=800&auto=format&fit=crop"
                      alt="Commercial Office Building"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <ComplianceBadge type="erc3643" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          Commercial Office Building
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          New York, NY
                        </p>
                      </div>
                      <Badge variant="outline">$28.7M</Badge>
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <span>$1,150 / token</span>
                      <span>42% funded</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{
                          width: "42%",
                        }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleNextStep}>
                  Select Commercial Office Building
                </Button>
              </div>
            </motion.div>
          )}
          {currentStep === "purchase" && (
            <motion.div
              key="purchase"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="bg-card border rounded-lg p-6"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6"></path>
                    <path d="M12 18v2"></path>
                    <path d="M12 6v2"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold text-center mb-2">
                Purchase Tokens
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                Buy fractional ownership tokens using cUSD
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="rounded-lg overflow-hidden mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1554435493-93422e8d1a41?q=80&w=800&auto=format&fit=crop"
                      alt="Commercial Office Building"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <h3 className="font-medium">Commercial Office Building</h3>
                  <p className="text-sm text-muted-foreground">New York, NY</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Valuation</span>
                      <span>$28,750,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Token Price</span>
                      <span>$1,150</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Expected Return
                      </span>
                      <span>7.2% annually</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="p-4 border rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <ComplianceBadge type="erc3643" />
                      <ComplianceBadge type="kyc" status="active" />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium block mb-1">
                          Purchase Amount
                        </label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            value="5"
                            min="1"
                            className="w-full rounded-l-md border border-r-0 px-3 py-2 text-sm"
                            readOnly
                          />
                          <div className="bg-muted border border-l-0 rounded-r-md px-3 py-2 text-sm">
                            tokens
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1">
                          Total Cost
                        </label>
                        <div className="flex items-center">
                          <div className="bg-muted border border-r-0 rounded-l-md px-3 py-2 text-sm">
                            cUSD
                          </div>
                          <input
                            type="text"
                            value="5,750"
                            className="w-full rounded-r-md border border-l-0 px-3 py-2 text-sm font-medium"
                            readOnly
                          />
                        </div>
                      </div>
                      <Button
                        className="w-full flex items-center justify-center gap-2"
                        onClick={handlePurchase}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6"></path>
                              <path d="M12 18v2"></path>
                              <path d="M12 6v2"></path>
                            </svg>
                            Buy with cUSD
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-2">
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
                        <path d="M12 8v4"></path>
                        <path d="M12 16h.01"></path>
                      </svg>
                      <span className="text-sm font-medium">About cUSD</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      cUSD is a stablecoin on the Celo network that maintains a
                      1:1 peg with the US Dollar. It's used for all transactions
                      on the OwnBlock platform.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {currentStep === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="bg-card border rounded-lg p-6"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold text-center mb-2">
                Investment Dashboard
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                Manage your tokenized real estate investments and track
                performance
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-background border rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Total Investment Value
                  </p>
                  <p className="text-2xl font-semibold">$5,750</p>
                  <p className="text-xs text-muted-foreground">1 property</p>
                </div>
                <div className="p-4 bg-background border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Tokens</p>
                  <p className="text-2xl font-semibold">5</p>
                  <p className="text-xs text-muted-foreground">
                    Avg. price: $1,150
                  </p>
                </div>
                <div className="p-4 bg-background border rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Projected Annual Return
                  </p>
                  <p className="text-2xl font-semibold text-primary">$414</p>
                  <p className="text-xs text-muted-foreground">7.2% annually</p>
                </div>
              </div>
              <div className="bg-background border rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Your Investments</h3>
                <div className="flex items-start gap-4">
                  <div className="w-1/4">
                    <div className="aspect-square rounded-md overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1554435493-93422e8d1a41?q=80&w=800&auto=format&fit=crop"
                        alt="Commercial Office Building"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">
                          Commercial Office Building
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          New York, NY
                        </p>
                      </div>
                      <ComplianceBadge type="erc3643" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Tokens</p>
                        <p className="font-medium">5</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Value</p>
                        <p className="font-medium">$5,750</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Funding Progress</span>
                        <span>42%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{
                            width: "42%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-background border rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Ecosystem Integrations</h3>
                  <Badge variant="info">Celo Powered</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center gap-2 mb-1">
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
                        className="text-primary"
                      >
                        <path d="M12 2v20M2 12h20M7 12a5 5 0 0 1 5-5M12 17a5 5 0 0 0 5-5"></path>
                      </svg>
                      <span className="font-medium text-sm">
                        Ubeswap Liquidity
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add tokens to Ubeswap liquidity pools
                    </p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center gap-2 mb-1">
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
                        className="text-primary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <span className="font-medium text-sm">
                        DAO Governance
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Participate in property management decisions
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Link href="/dashboard">
                  <Button>Go to Full Dashboard</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
