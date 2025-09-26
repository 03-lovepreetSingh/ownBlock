import React, { Component } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tooltip } from "../../components/ui/tooltip";
import { AssetPassport } from "../../components/asset-passport";
// Sample document data
const sampleDocuments = [
  {
    name: "Property Deed",
    type: "Legal Document",
    hash: "QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx",
    verified: true,
    verifier: "LegalVerify Inc.",
    date: "2023-04-15",
  },
  {
    name: "Title Insurance",
    type: "Insurance",
    hash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    verified: true,
    verifier: "TitleGuard Services",
    date: "2023-04-18",
  },
  {
    name: "Valuation Report",
    type: "Financial Document",
    hash: "QmT8B9Mz5A5C3hVLXCGNwsamBYRFjLQSCfFkzRSK5MULkZ",
    verified: true,
    verifier: "ValueAssess Partners",
    date: "2023-03-30",
  },
  {
    name: "Tokenization Agreement",
    type: "Legal Document",
    hash: "QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn",
    verified: true,
    verifier: "BlockChainLegal LLC",
    date: "2023-05-02",
  },
];
// Sample attestation data
const sampleAttestations = [
  {
    name: "Property Valuation",
    issuer: "ValueAssess Partners",
    did: "did:ethr:0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    date: "2023-03-30",
    status: "valid",
  },
  {
    name: "Legal Compliance",
    issuer: "BlockChainLegal LLC",
    did: "did:ethr:0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
    date: "2023-05-02",
    status: "valid",
  },
  {
    name: "Insurance Coverage",
    issuer: "InsureDAO",
    did: "did:celo:0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
    date: "2023-04-25",
    status: "valid",
  },
];
// Sample ownership data
const sampleOwnershipRecords = [
  {
    address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    tokens: 5000,
    percentage: 20,
    date: "2023-05-10",
    type: "institutional",
  },
  {
    address: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    tokens: 2500,
    percentage: 10,
    date: "2023-05-12",
    type: "retail",
  },
  {
    address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    tokens: 1500,
    percentage: 6,
    date: "2023-05-15",
    type: "retail",
  },
  {
    address: "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
    tokens: 1000,
    percentage: 4,
    date: "2023-05-18",
    type: "developer",
  },
];
export function TransparencyPage() {
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
            Asset Passport & Verification
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
            OwnBlock provides complete transparency for all tokenized properties
            through our Asset Passport system
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
              <CardTitle>What is an Asset Passport?</CardTitle>
              <CardDescription>
                A comprehensive digital record of a property's documentation,
                verification, and ownership history
              </CardDescription>
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
                    <div>
                      <h3 className="text-md font-semibold mb-1">
                        Complete Transparency
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        The Asset Passport provides investors with complete
                        transparency into all aspects of a property's
                        documentation, verification status, and ownership
                        history. All documents are cryptographically verified
                        and stored on IPFS, ensuring their immutability and
                        accessibility.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Document Verification",
                        description:
                          "All property documents are verified and stored with IPFS hashes",
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
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                        ),
                      },
                      {
                        title: "Attestations",
                        description:
                          "Third-party verifications and attestations from trusted authorities",
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
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        ),
                      },
                      {
                        title: "Ownership Records",
                        description:
                          "Complete history of token ownership and transfers",
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
                            <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        ),
                      },
                      {
                        title: "Verifier DIDs",
                        description:
                          "Decentralized identifiers for all verification authorities",
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
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
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
          <h2 className="text-2xl font-bold mb-4">Sample Asset Passport</h2>
          <AssetPassport
            propertyId="property-123456"
            documents={sampleDocuments}
            attestations={sampleAttestations}
            ownershipRecords={sampleOwnershipRecords}
          />
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
            delay: 0.5,
          }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Verification Technology</CardTitle>
              <CardDescription>
                How OwnBlock ensures document and identity verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      IPFS Document Storage
                    </h3>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
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
                            className="text-primary"
                          >
                            <path d="m2 16 20 6-6-20L8 8l-6 8Z"></path>
                            <path d="M17.83 12.17 12 18l-5.83-5.83"></path>
                          </svg>
                          <h4 className="font-medium">
                            Content-Addressed Storage
                          </h4>
                        </div>
                        <Badge variant="outline">IPFS</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        All property documents are stored on IPFS, which
                        generates a unique cryptographic hash based on the
                        content. This ensures that documents cannot be modified
                        without changing the hash, providing tamper-proof
                        verification.
                      </p>
                      <div className="mt-3 p-2 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between text-xs">
                          <Tooltip content="Example IPFS Content Identifier">
                            <span className="font-mono">
                              QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx
                            </span>
                          </Tooltip>
                          <Badge variant="success">Verified</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Decentralized Identity
                    </h3>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
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
                            className="text-primary"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <h4 className="font-medium">
                            Verifiable Credentials
                          </h4>
                        </div>
                        <Badge variant="outline">ERC-725/Celo DID</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        OwnBlock uses decentralized identity (DID) standards to
                        verify the identity of all parties involved in property
                        transactions. This includes property owners, verifiers,
                        and investors.
                      </p>
                      <div className="mt-3 p-2 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between text-xs">
                          <Tooltip content="Example Decentralized Identifier">
                            <span className="font-mono">
                              did:celo:0x617F2E2fD72FD9D5503197092aC168c91465E7f2
                            </span>
                          </Tooltip>
                          <Badge variant="success">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">
                    Verification Process
                  </h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                    {[
                      {
                        title: "Document Submission",
                        description:
                          "Property owners submit legal documents and financial records",
                      },
                      {
                        title: "Verification by Authorities",
                        description:
                          "Trusted third-party verifiers review and validate all documents",
                      },
                      {
                        title: "IPFS Storage",
                        description:
                          "Verified documents are stored on IPFS with unique content identifiers",
                      },
                      {
                        title: "Attestation Creation",
                        description:
                          "Verifiers create signed attestations with their DIDs",
                      },
                      {
                        title: "Asset Passport Generation",
                        description:
                          "All verifications and attestations are compiled into the Asset Passport",
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
                        <div>
                          <h4 className="font-medium">
                            {index + 1}. {step.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
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
