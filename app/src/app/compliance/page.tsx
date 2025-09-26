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
import { ComplianceBadge } from "../../components/compliance-badge";
export default function CompliancePage() {
  return (
    <div className="px-4 py-12">
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
        }}
        className="max-w-4xl mx-auto"
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
              delay: 0.1,
            }}
          >
            On-Chain Compliance
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
              delay: 0.2,
            }}
          >
            OwnBlock enforces regulatory compliance at the smart contract level
            using the ERC-3643 token standard
          </motion.p>
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
            delay: 0.3,
          }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>ERC-3643 Token Standard</CardTitle>
                  <CardDescription>
                    On-chain compliance enforcement
                  </CardDescription>
                </div>
                <ComplianceBadge type="erc3643" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg">
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
                      <h3 className="text-md font-semibold mb-1">
                        What is ERC-3643?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ERC-3643, also known as T-REX (Token for Regulated
                        EXchanges), is a token standard designed specifically
                        for security tokens. It enforces regulatory compliance
                        at the smart contract level, ensuring that only eligible
                        investors can hold and transfer tokens.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Transfer Restrictions",
                        description:
                          "Only whitelisted addresses that have passed KYC/AML checks can receive tokens",
                        icon: (
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
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                        ),
                      },
                      {
                        title: "Identity Verification",
                        description:
                          "KYC/AML checks are performed before investors can be whitelisted",
                        icon: (
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
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        ),
                      },
                      {
                        title: "Forced Transfers",
                        description:
                          "Regulatory authorities can force transfer tokens if required",
                        icon: (
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
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                        ),
                      },
                      {
                        title: "Granular Permissions",
                        description:
                          "Different roles and permissions can be assigned to various stakeholders",
                        icon: (
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
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        ),
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
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
                          delay: 0.1 * (index + 1),
                        }}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-primary">{feature.icon}</div>
                          <h4 className="font-medium">{feature.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Compliance Workflow
                  </h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                    {[
                      {
                        title: "1. KYC Verification",
                        description:
                          "Users complete KYC verification via Self Protocol, which creates a verifiable credential",
                        badge: <ComplianceBadge type="kyc" status="active" />,
                      },
                      {
                        title: "2. Whitelist Addition",
                        description:
                          "Upon successful KYC, the user's address is added to the token's whitelist",
                        badge: <Badge variant="success">Whitelisted</Badge>,
                      },
                      {
                        title: "3. Transfer Validation",
                        description:
                          "When a transfer is initiated, the smart contract checks if both sender and receiver are whitelisted",
                        badge: <ComplianceBadge type="restricted" />,
                      },
                      {
                        title: "4. Transaction Execution",
                        description:
                          "The transfer is only executed if all compliance checks pass, otherwise it's rejected",
                        badge: (
                          <Badge variant="info">On-Chain Enforcement</Badge>
                        ),
                      },
                    ].map((step, index) => (
                      <motion.div
                        key={step.title}
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1 * (index + 1),
                        }}
                        className="ml-8 mb-6 relative"
                      >
                        <div className="absolute -left-8 top-1.5 w-4 h-4 rounded-full bg-primary"></div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{step.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {step.description}
                            </p>
                          </div>
                          <div>{step.badge}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
            delay: 0.4,
          }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status Indicators</CardTitle>
              <CardDescription>
                Visual indicators for compliance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Whitelisted Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">KYC Verified</span>
                      <ComplianceBadge type="kyc" status="active" />
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="text-sm font-medium mb-1">
                        Buy Button:
                      </div>
                      <button className="w-full px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm">
                        Buy with cUSD
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Whitelisted users have completed KYC verification and can
                      buy and transfer tokens
                    </p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Pending Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">KYC Pending</span>
                      <ComplianceBadge type="kyc" status="pending" />
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="text-sm font-medium mb-1">
                        Buy Button:
                      </div>
                      <button
                        className="w-full px-3 py-1.5 bg-muted text-muted-foreground rounded-md text-sm"
                        disabled
                      >
                        KYC Required
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Users with pending KYC must complete verification before
                      they can buy tokens
                    </p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Blacklisted Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">KYC Denied</span>
                      <ComplianceBadge type="kyc" status="denied" />
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="text-sm font-medium mb-1">
                        Buy Button:
                      </div>
                      <button
                        className="w-full px-3 py-1.5 bg-destructive text-destructive-foreground rounded-md text-sm"
                        disabled
                      >
                        Transfer Denied - Not Whitelisted
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Blacklisted users cannot buy or receive tokens due to
                      failed compliance checks
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
