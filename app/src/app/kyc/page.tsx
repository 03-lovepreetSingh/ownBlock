"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tooltip } from "../../components/ui/tooltip";
import { useUser } from "../../context/user-context";
import { ComplianceBadge } from "../../components/compliance-badge";
import Link from "next/link";
// Required document types for KYC
const requiredDocuments = [
  {
    id: "id_verification",
    title: "Government-issued ID",
    description: "Passport, driver's license, or national ID card",
    status: "pending",
    required: true,
  },
  {
    id: "proof_of_address",
    title: "Proof of Address",
    description: "Utility bill, bank statement (less than 3 months old)",
    status: "pending",
    required: true,
  },
  {
    id: "selfie",
    title: "Selfie Verification",
    description: "Photo of yourself holding your ID document",
    status: "pending",
    required: true,
  },
  {
    id: "accredited_investor",
    title: "Accredited Investor Status",
    description: "Financial statements or certification letter",
    status: "pending",
    required: false,
  },
];
export default function KycPage() {
  const { user, completeKyc, isWhitelisted } = useUser();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [documents, setDocuments] = useState(requiredDocuments);
  const [uploadProgress, setUploadProgress] = useState({});
  const router = useRouter();
  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate verification process with stages
    setTimeout(() => {
      setActiveStep(2);
      // Simulate document processing
      setTimeout(() => {
        setActiveStep(3);
        // Simulate verification completion
        setTimeout(() => {
          setIsVerifying(false);
          setIsVerified(true);
          completeKyc();
          // Redirect after a short delay
          setTimeout(() => {
            router.push("/marketplace");
          }, 3000);
        }, 2000);
      }, 2000);
    }, 1500);
  };
  const handleFileUpload = (docId) => {
    // Simulate file upload with progress
    setUploadProgress((prev) => ({
      ...prev,
      [docId]: 0,
    }));
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = (prev[docId] || 0) + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Update document status after upload completes
          setDocuments((docs) =>
            docs.map((doc) =>
              doc.id === docId
                ? {
                    ...doc,
                    status: "uploaded",
                  }
                : doc
            )
          );
          return {
            ...prev,
            [docId]: 100,
          };
        }
        return {
          ...prev,
          [docId]: newProgress,
        };
      });
    }, 300);
  };
  const allRequiredDocsUploaded = () => {
    return documents
      .filter((doc) => doc.required)
      .every((doc) => doc.status === "uploaded");
  };
  if (!user) {
    return (
      <div className="px-4 py-16 flex flex-col items-center justify-center text-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You need to connect your wallet to complete KYC verification
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/")}>Return to Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  if (isWhitelisted()) {
    return (
      <div className="px-4 py-16 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-8"
        >
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 w-16 h-16 mx-auto flex items-center justify-center">
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
              className="text-green-600 dark:text-green-400 h-8 w-8"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </motion.div>
        <motion.h2
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
          className="text-2xl font-bold mb-2"
        >
          KYC Verification Complete
        </motion.h2>
        <motion.p
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
          className="text-muted-foreground mb-8"
        >
          Your identity has been verified. You can now invest in tokenized
          properties.
        </motion.p>
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
          className="flex gap-4"
        >
          <Button onClick={() => router.push("/marketplace")}>
            Browse Marketplace
          </Button>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="px-4 py-12 md:py-16 max-w-2xl mx-auto">
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
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tighter">
          KYC Verification
        </h1>
        <p className="text-muted-foreground mt-2">
          Complete identity verification to invest in tokenized properties
        </p>
      </motion.div>

      {/* Progress tracker */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep >= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {activeStep > step ? (
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
                    className="h-5 w-5"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`text-xs mt-1 ${
                  activeStep >= step
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step === 1
                  ? "Document Upload"
                  : step === 2
                  ? "Verification"
                  : "Completion"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-1 w-full bg-muted">
          <div
            className="h-1 bg-primary transition-all"
            style={{
              width: `${((activeStep - 1) / 2) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Identity Verification</CardTitle>
              <CardDescription>
                We partner with Self Protocol for secure and compliant KYC
                verification
              </CardDescription>
            </div>
            <ComplianceBadge type="kyc" status="pending" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Estimated time section */}
            <div className="p-4 bg-muted/50 rounded-lg flex items-center">
              <div className="mr-4 bg-background rounded-full p-2">
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
                  className="text-primary"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Estimated Completion Time</h3>
                <p className="text-sm text-muted-foreground">
                  Document upload: 5 minutes • Verification: 1-24 hours
                </p>
              </div>
            </div>

            {/* Wallet address */}
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Wallet Address</h3>
              <div className="text-sm font-mono bg-muted p-2 rounded flex items-center justify-between">
                <span>{user.address}</span>
                <Tooltip content="Address verified">
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
                    className="text-green-500"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </Tooltip>
              </div>
            </div>

            {/* Document checklist */}
            {activeStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-medium">Required Documents</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Please upload the following documents to verify your identity
                </p>
                {documents.map((doc) => (
                  <div key={doc.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
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
                            className="text-muted-foreground"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">{doc.title}</h4>
                            {doc.required && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                      <div>
                        {doc.status === "uploaded" ? (
                          <Badge variant="success">Uploaded</Badge>
                        ) : (
                          <Badge variant={doc.required ? "warning" : "outline"}>
                            {doc.required ? "Required" : "Optional"}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {uploadProgress[doc.id] !== undefined &&
                      uploadProgress[doc.id] < 100 && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Uploading...</span>
                            <span>{uploadProgress[doc.id]}%</span>
                          </div>
                          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{
                                width: `${uploadProgress[doc.id]}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    <div className="mt-3 flex justify-end">
                      {doc.status === "uploaded" ? (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleFileUpload(doc.id)}
                          disabled={
                            uploadProgress[doc.id] !== undefined &&
                            uploadProgress[doc.id] < 100
                          }
                        >
                          Upload Document
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="p-4 bg-muted/30 rounded-md border border-muted mt-4">
                  <div className="flex items-start gap-2">
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
                      className="text-blue-500 mt-0.5"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">
                        Document Requirements
                      </h4>
                      <ul className="text-xs text-muted-foreground mt-1 list-disc list-inside space-y-1">
                        <li>Files must be JPG, PNG, or PDF format</li>
                        <li>Maximum file size: 5MB</li>
                        <li>Documents must be clearly visible and uncropped</li>
                        <li>Documents must not be expired</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Verification in progress */}
            {activeStep === 2 && (
              <div className="py-8 flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <h3 className="text-lg font-medium mb-2">
                  Verifying your identity...
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  We're processing your documents to verify your identity. This
                  typically takes 1-24 hours, but may be faster.
                </p>
                <div className="w-full max-w-md mt-6 space-y-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-sm">Documents received</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary animate-pulse"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <span className="text-sm">Processing verification</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center mr-3">
                      <span className="text-xs text-muted-foreground">3</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Complete verification
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Verification complete */}
            {activeStep === 3 && (
              <div className="py-8 flex flex-col items-center">
                <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 w-12 h-12 flex items-center justify-center mb-4">
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
                    className="text-green-600 dark:text-green-400"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Verification Complete!
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                  Your identity has been successfully verified. You can now
                  invest in tokenized properties on our platform.
                </p>
                <div className="flex items-center justify-center p-3 bg-green-50 dark:bg-green-900/10 rounded-md">
                  <ComplianceBadge type="kyc" status="active" />
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Redirecting to marketplace...
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.back()}
            disabled={isVerifying}
          >
            Back
          </Button>
          {activeStep === 1 && (
            <Button
              onClick={handleVerify}
              disabled={!allRequiredDocsUploaded() || isVerifying}
            >
              Submit for Verification
            </Button>
          )}
          {activeStep > 1 && !isVerified && (
            <Button
              onClick={() => router.push("/marketplace")}
              variant="outline"
            >
              Continue to Marketplace
            </Button>
          )}
          {isVerified && (
            <Button onClick={() => router.push("/marketplace")}>
              Continue to Marketplace
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Contextual help */}
      <div className="mt-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Why KYC is Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Know Your Customer (KYC) verification is required for regulatory
              compliance with securities laws when investing in tokenized real
              estate. This ensures:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Compliance with anti-money laundering regulations</li>
              <li>Prevention of fraud and identity theft</li>
              <li>Verification of accredited investor status where required</li>
              <li>Secure and compliant property token transfers</li>
            </ul>
          </CardContent>
          <CardFooter className="pt-2">
            <Link
              href="/compliance"
              className="text-sm text-primary hover:underline"
            >
              Learn more about our compliance framework →
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
