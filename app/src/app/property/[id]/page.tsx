"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Tabs } from "../../../components/ui/tabs";
import { ComplianceBadge } from "../../../components/compliance-badge";
import { AssetPassport } from "../../../components/asset-passport";
import { EcosystemIntegration } from "../../../components/ecosystem-integration";
import { TokenMarketData } from "../../../components/token-market-data";
import { useUser } from "../../../context/user-context";
// Sample property data
const properties = {
  "1": {
    id: "1",
    title: "Luxury Apartment Complex",
    location: "Miami, FL",
    valuation: "$12,500,000",
    tokenStatus: "Active",
    fundingProgress: 68,
    tokenPrice: "$500",
    totalTokens: "25,000",
    availableTokens: "8,000",
    minInvestment: "5 tokens ($2,500)",
    description:
      "Modern luxury apartment complex in the heart of Miami featuring premium amenities, including rooftop pool, fitness center, and concierge services. Located in a prime neighborhood with high rental demand.",
    features: [
      "Built in 2019",
      "120 residential units",
      "5,000 sq ft of retail space",
      "Parking garage with 150 spaces",
      "Rooftop amenities",
      "24/7 security",
    ],
    financials: {
      projectedAnnualReturn: "8.5%",
      dividendFrequency: "Quarterly",
      managementFee: "1.5%",
      occupancyRate: "94%",
    },
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    ],
  },
  "2": {
    id: "2",
    title: "Commercial Office Building",
    location: "New York, NY",
    valuation: "$28,750,000",
    tokenStatus: "Active",
    fundingProgress: 42,
    tokenPrice: "$1,150",
    totalTokens: "25,000",
    availableTokens: "14,500",
    minInvestment: "2 tokens ($2,300)",
    description:
      "Prime commercial office building in Manhattan's financial district. Recently renovated with modern amenities and infrastructure. Fully leased to AAA tenants with long-term contracts.",
    features: [
      "Built in 2005, renovated in 2021",
      "18 floors",
      "120,000 sq ft of leasable space",
      "LEED Gold certified",
      "Underground parking",
      "Conference center",
    ],
    financials: {
      projectedAnnualReturn: "7.2%",
      dividendFrequency: "Quarterly",
      managementFee: "1.2%",
      occupancyRate: "97%",
    },
    image:
      "https://images.unsplash.com/photo-1554435493-93422e8d1a41?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1554435493-93422e8d1a41?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop",
    ],
  },
};
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
export default function PropertyPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user, isWhitelisted } = useUser();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState(5);
  useEffect(() => {
    // Simulate API call to fetch property data
    setProperty(properties[id]);
  }, [id]);
  const handlePurchase = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(
        `Successfully purchased ${purchaseAmount} tokens for $${(
          purchaseAmount * 500
        ).toLocaleString()}`
      );
    }, 1500);
  };
  if (!property) {
    return (
      <div className="px-4 py-16 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">
          Loading property details...
        </p>
      </div>
    );
  }
  const getBuyButtonState = () => {
    if (!user) {
      return {
        text: "Connect Wallet to Buy",
        disabled: true,
        variant: "outline" as const,
      };
    } else if (!isWhitelisted()) {
      return {
        text: "KYC Required",
        disabled: true,
        variant: "outline" as const,
      };
    } else {
      return {
        text: `Buy with cUSD ($${(purchaseAmount * 500).toLocaleString()})`,
        disabled: false,
        variant: "default" as const,
      };
    }
  };
  const buyButtonState = getBuyButtonState();
  const propertyTabs = [
    {
      id: "details",
      label: "Details",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Property Description</h3>
            <p className="text-muted-foreground">{property.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.features.map((feature, index) => (
                <li key={index} className="flex items-center">
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
                    className="mr-2 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Financial Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Projected Annual Return
                </p>
                <p className="text-xl font-semibold text-primary">
                  {property.financials.projectedAnnualReturn}
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Dividend Frequency
                </p>
                <p className="text-xl font-semibold">
                  {property.financials.dividendFrequency}
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Management Fee</p>
                <p className="text-xl font-semibold">
                  {property.financials.managementFee}
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <p className="text-xl font-semibold">
                  {property.financials.occupancyRate}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="h-64 bg-muted rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <div className="text-center">
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
                    className="mx-auto mb-2 text-muted-foreground"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <p className="text-muted-foreground">{property.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tokenization",
      label: "Tokenization",
      content: (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
            <ComplianceBadge type="erc3643" />
            <ComplianceBadge type="restricted" />
          </div>
          <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
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
                  ERC-3643 Compliant Tokens
                </h3>
                <p className="text-sm text-muted-foreground">
                  This property is tokenized using the ERC-3643 standard, which
                  enforces regulatory compliance at the smart contract level.
                  Only whitelisted addresses that have passed KYC verification
                  can buy, hold, and transfer these tokens.
                </p>
              </div>
            </div>
          </div>
          <TokenMarketData />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Token Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token Price</span>
                  <span className="font-medium">{property.tokenPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span className="font-medium">
                    {property.totalTokens} tokens
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Available Tokens
                  </span>
                  <span className="font-medium">
                    {property.availableTokens} tokens
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Minimum Investment
                  </span>
                  <span className="font-medium">{property.minInvestment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token Standard</span>
                  <span className="font-medium">ERC-3643 (T-REX)</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Funding Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Raised</span>
                  <span>{property.fundingProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <motion.div
                    className="bg-primary h-2.5 rounded-full"
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${property.fundingProgress}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.2,
                    }}
                  ></motion.div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    $
                    {(
                      (property.fundingProgress / 100) *
                      parseInt(property.valuation.replace(/[^0-9]/g, ""))
                    ).toLocaleString()}{" "}
                    raised
                  </span>
                  <span>Goal: {property.valuation}</span>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Purchase Tokens</h3>
                <div className="flex items-center gap-2 mb-3">
                  <button
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                    onClick={() =>
                      setPurchaseAmount(Math.max(1, purchaseAmount - 1))
                    }
                  >
                    -
                  </button>
                  <div className="flex-1 text-center font-medium">
                    {purchaseAmount} tokens
                  </div>
                  <button
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                    onClick={() => setPurchaseAmount(purchaseAmount + 1)}
                  >
                    +
                  </button>
                </div>
                <Button
                  className="w-full"
                  variant={buyButtonState.variant}
                  disabled={buyButtonState.disabled || isLoading}
                  onClick={handlePurchase}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    buyButtonState.text
                  )}
                </Button>
                {!user && (
                  <p className="text-xs text-center mt-2 text-muted-foreground">
                    Connect your wallet to purchase tokens
                  </p>
                )}
                {user && !isWhitelisted() && (
                  <p className="text-xs text-center mt-2 text-muted-foreground">
                    <Link href="/kyc" className="text-primary hover:underline">
                      Complete KYC
                    </Link>{" "}
                    to enable token purchases
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "passport",
      label: "Asset Passport",
      content: (
        <AssetPassport
          propertyId={property.id}
          documents={sampleDocuments}
          attestations={sampleAttestations}
          ownershipRecords={sampleOwnershipRecords}
        />
      ),
    },
    {
      id: "ecosystem",
      label: "Ecosystem",
      content: <EcosystemIntegration />,
    },
  ];
  return (
    <div className="px-4 py-12">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-7/12">
          <motion.div
            className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4"
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
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              />
            </AnimatePresence>
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge variant="success" animated>
                {property.tokenStatus}
              </Badge>
              <ComplianceBadge type="erc3643" />
            </div>
          </motion.div>
          <div className="flex gap-2 mb-6">
            {property.images.map((image, index) => (
              <motion.div
                key={index}
                className={`cursor-pointer w-20 h-20 rounded-md overflow-hidden ${
                  activeImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveImage(index)}
                whileHover={{
                  scale: 1.05,
                }}
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
                  delay: 0.1 * index,
                }}
              >
                <img
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
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
          >
            <Tabs tabs={propertyTabs} />
          </motion.div>
        </div>
        <div className="w-full md:w-5/12">
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
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{property.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
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
                        className="mr-1"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {property.location}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{property.valuation}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Investment Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Token Price
                        </p>
                        <p className="font-semibold">{property.tokenPrice}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Available Tokens
                        </p>
                        <p className="font-semibold">
                          {property.availableTokens}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Min Investment
                        </p>
                        <p className="font-semibold">
                          {property.minInvestment}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Expected Return
                        </p>
                        <p className="font-semibold">
                          {property.financials.projectedAnnualReturn}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Funding Progress</span>
                      <span>{property.fundingProgress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${property.fundingProgress}%`,
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.2,
                        }}
                      ></motion.div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
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
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <h3 className="font-medium">Compliance Status</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">ERC-3643 Compliance</span>
                        <Badge variant="success">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Transfer Restrictions</span>
                        <Badge variant="info">Enforced</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">KYC Requirement</span>
                        <Badge variant="warning">Required</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Transfers are restricted to whitelisted addresses only.
                      All investors must complete KYC verification.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button
                  className="w-full"
                  variant={buyButtonState.variant}
                  disabled={buyButtonState.disabled || isLoading}
                  onClick={handlePurchase}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    buyButtonState.text
                  )}
                </Button>
                {user && !isWhitelisted() && (
                  <Link href="/kyc" className="w-full">
                    <Button variant="outline" className="w-full">
                      Complete KYC Verification
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          </motion.div>
          <motion.div
            className="mt-6"
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
            <EcosystemIntegration variant="sidebar" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
