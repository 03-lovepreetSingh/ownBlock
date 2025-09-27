"use client";

import React, { useEffect, useState, use } from "react";
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
import { useProperty } from "../../../hooks/useProperties";
import { useCreateInvestment } from "../../../hooks/useInvestments";
import { usePropertyDocuments, usePropertyAttestations, usePropertyOwnership } from "../../../hooks/useAssetData";
// Property data will be loaded from API
export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, isWhitelisted } = useUser();
  const [activeImage, setActiveImage] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState(5);
  
  const { data: property, isLoading, error } = useProperty(id);
  const createInvestment = useCreateInvestment();
  
  // Fetch asset data
  const { data: documents = [] } = usePropertyDocuments(id);
  const { data: attestations = [] } = usePropertyAttestations(id);
  const { data: ownershipRecords = [] } = usePropertyOwnership(id);
  const handlePurchase = () => {
    if (!user || !property || !property.tokenId) return;
    
    createInvestment.mutate(
      {
        propertyTokenId: property.tokenId,
        amount: purchaseAmount.toString(),
        tokenAmount: purchaseAmount.toString(),
        price: property.tokenPrice || "0"
      },
      {
        onSuccess: () => {
          alert(`Investment of ${purchaseAmount} tokens submitted successfully!`);
        },
        onError: (error) => {
          alert(`Investment failed: ${error.message}`);
        }
      }
    );
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Loading Property</h2>
          <p className="text-muted-foreground">Please wait while we fetch the property details.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Property</h2>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Property Not Found</h2>
          <p className="text-muted-foreground">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  const getBuyButtonState = () => {
    if (createInvestment.isPending) {
      return {
        text: "Processing...",
        disabled: true,
        variant: "default" as const,
      };
    }
    
    if (!user) {
      return {
        text: "Connect Wallet to Invest",
        disabled: true,
        variant: "secondary" as const,
      };
    }
    
    if (!isWhitelisted()) {
      return {
        text: "Complete KYC to Invest",
        disabled: true,
        variant: "secondary" as const,
      };
    }
    
    return {
      text: `Buy ${purchaseAmount} Tokens`,
      disabled: false,
      variant: "default" as const,
    };
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
            <p className="text-muted-foreground">{property.description || 'No description available for this property.'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.features?.length > 0 ? property.features.map((feature, index) => (
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
              )) : (
                <li className="text-muted-foreground col-span-2">No features listed for this property.</li>
              )}
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
                  {property.projectedAnnualReturn}%
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Dividend Frequency
                </p>
                <p className="text-xl font-semibold">
                  {property.dividendFrequency || 'Quarterly'}
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Management Fee</p>
                <p className="text-xl font-semibold">
                  {property.managementFee || '2%'}
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <p className="text-xl font-semibold">
                  {property.occupancyRate || '95%'}
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
                  <p className="text-muted-foreground">
                    {property.address 
                      ? `${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zipCode}`
                      : property.location
                    }
                  </p>
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
          <TokenMarketData propertyId={property.id} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Token Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token Price</span>
                  <span className="font-medium">${property.tokenPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span className="font-medium">
                    {property.totalSupply} tokens
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Available Tokens
                  </span>
                  <span className="font-medium">
                    {property.availableSupply || 0} tokens
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Minimum Investment
                  </span>
                  <span className="font-medium">${property.minInvestment?.toLocaleString()}</span>
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
                  <span>{Math.round(((property.totalSupply || 0) - (property.availableSupply || 0)) / (property.totalSupply || 1) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <motion.div
                    className="bg-primary h-2.5 rounded-full"
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${((property.totalSupply || 0) - (property.availableSupply || 0)) / (property.totalSupply || 1) * 100}%`,
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
                      (((property.totalSupply || 0) - (property.availableSupply || 0)) / (property.totalSupply || 1)) *
                      parseFloat(property.valuation || "0")
                    ).toLocaleString()}{" "}
                    raised
                  </span>
                  <span>Goal: ${property.valuation?.toLocaleString()}</span>
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
                  disabled={buyButtonState.disabled || createInvestment.isPending}
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
          documents={documents}
          attestations={attestations}
          ownershipRecords={ownershipRecords}
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
                src={property.images?.[0] || '/placeholder-property.jpg'}
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
                {property.status}
              </Badge>
              <ComplianceBadge type="erc3643" />
            </div>
          </motion.div>
          <div className="flex gap-2 mb-6">
            {property.images?.[0] && (
              <motion.div
                className={`cursor-pointer w-20 h-20 rounded-md overflow-hidden ${
                  activeImage === 0 ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveImage(0)}
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
                  delay: 0.1,
                }}
              >
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
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
                  {typeof property.address === 'object' && property.address 
                    ? `${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zipCode}`
                    : property.location || 'Location not available'}
                </CardDescription>
                  </div>
                  <Badge variant="outline">${property.valuation?.toLocaleString()}</Badge>
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
                        <p className="font-semibold">${property.tokenPrice}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Available Tokens
                        </p>
                        <p className="font-semibold">
                          {property.availableSupply || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Min Investment
                        </p>
                        <p className="font-semibold">
                          ${property.minInvestment?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Expected Return
                        </p>
                        <p className="font-semibold">
                          {property.projectedAnnualReturn}%</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Funding Progress</span>
                      <span>{Math.round(((property.totalSupply || 0) - (property.availableSupply || 0)) / (property.totalSupply || 1) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${((property.totalSupply || 0) - (property.availableSupply || 0)) / (property.totalSupply || 1) * 100}%`,
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
