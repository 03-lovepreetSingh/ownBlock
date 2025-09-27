"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { useUser } from "../../context/user-context";
import Link from "next/link";
import { Slider } from "../../components/ui/slider";
import { useToast } from "../../components/ui/toaster";
import { PropertyDetailsStep } from "../../components/tokenize/PropertyDetailsStep";
import { TokenizationDetailsStep } from "../../components/tokenize/TokenizationDetailsStep";
import { OwnershipStructureStep } from "../../components/tokenize/OwnershipStructureStep";
import { DocumentsStep } from "../../components/tokenize/DocumentsStep";
import { ConfirmationStep } from "../../components/tokenize/ConfirmationStep";
import { useCreateProperty } from "../../hooks/useProperties";
// Define form types
export type InvestorDistribution = {
  retail: number;
  institutional: number;
  developer: number;
};
export type Document = {
  name: string;
  file: File | null;
  uploaded: boolean;
};
export type FormData = {
  propertyName: string;
  address: string;
  size: string;
  valuation: string;
  fractionSize: string;
  tokenPrice: string;
  totalTokens: string;
  spvEntityName: string;
  jurisdiction: string;
  legalStructure: string;
  tokenStandard: string;
  investorDistribution: InvestorDistribution;
  documents: Record<string, Document>;
};
// Dropdown options
export const jurisdictionOptions = [
  "Delaware, USA",
  "Wyoming, USA",
  "Nevada, USA",
  "Cayman Islands",
  "Singapore",
  "United Kingdom",
  "Switzerland",
  "Other",
];
export const legalStructureOptions = [
  "Limited Liability Company",
  "Corporation",
  "Limited Partnership",
  "Trust",
  "Foundation",
  "Other",
];
export const tokenStandardOptions = [
  "ERC-3643 (T-REX)",
  "ERC-1404 (Simple Restricted Token)",
  "ERC-20 with Restrictions",
  "Other",
];
export const documentTypes = [
  "Property Deed",
  "Title Insurance",
  "SPV Operating Agreement",
  "Tokenization Agreement",
  "Offering Memorandum",
  "Regulatory Compliance Certificate",
];
export default function TokenizePage() {
  const { user, isWhitelisted } = useUser();
  const { toast } = useToast();
  const createProperty = useCreateProperty();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  // Initialize form data
  const [formData, setFormData] = useState<FormData>({
    propertyName: "",
    address: "",
    size: "",
    valuation: "",
    fractionSize: "",
    tokenPrice: "",
    totalTokens: "",
    spvEntityName: "",
    jurisdiction: jurisdictionOptions[0],
    legalStructure: legalStructureOptions[0],
    tokenStandard: tokenStandardOptions[0],
    investorDistribution: {
      retail: 60,
      institutional: 30,
      developer: 10,
    },
    documents: documentTypes.reduce((acc, docType) => {
      acc[docType] = {
        name: docType,
        file: null,
        uploaded: false,
      };
      return acc;
    }, {} as Record<string, Document>),
  });
  // Check if investor distribution sums to 100%
  useEffect(() => {
    const { retail, institutional, developer } = formData.investorDistribution;
    const total = retail + institutional + developer;
    if (total !== 100) {
      setValidationErrors((prev) => ({
        ...prev,
        investorDistribution: `Total allocation must equal 100% (currently ${total}%)`,
      }));
    } else {
      setValidationErrors((prev) => {
        const newErrors = {
          ...prev,
        };
        delete newErrors.investorDistribution;
        return newErrors;
      });
    }
  }, [formData.investorDistribution]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDistributionChange = (
    type: keyof InvestorDistribution,
    value: number
  ) => {
    const currentDist = {
      ...formData.investorDistribution,
    };
    const oldValue = currentDist[type];
    const diff = value - oldValue;
    // Update the specified type
    currentDist[type] = value;
    // If we're increasing one value, decrease the others proportionally
    if (diff > 0) {
      const otherTypes = Object.keys(currentDist).filter(
        (k) => k !== type
      ) as Array<keyof InvestorDistribution>;
      const totalOther = otherTypes.reduce(
        (sum, key) => sum + currentDist[key],
        0
      );
      if (totalOther > 0) {
        otherTypes.forEach((key) => {
          const proportion = currentDist[key] / totalOther;
          currentDist[key] = Math.max(
            0,
            Math.round(currentDist[key] - diff * proportion)
          );
        });
      }
    }
    // Ensure the total is exactly 100
    const total = Object.values(currentDist).reduce((sum, val) => sum + val, 0);
    if (total !== 100) {
      const otherTypes = Object.keys(currentDist).filter(
        (k) => k !== type
      ) as Array<keyof InvestorDistribution>;
      if (otherTypes.length > 0 && currentDist[otherTypes[0]] > 0) {
        currentDist[otherTypes[0]] += 100 - total;
      } else if (otherTypes.length > 1 && currentDist[otherTypes[1]] > 0) {
        currentDist[otherTypes[1]] += 100 - total;
      }
    }
    setFormData((prev) => ({
      ...prev,
      investorDistribution: currentDist,
    }));
  };
  const handleFileChange = (docType: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: {
          ...prev.documents[docType],
          file,
          uploaded: !!file,
        },
      },
    }));
  };
  const validateCurrentStep = () => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.propertyName)
        errors.propertyName = "Property name is required";
      if (!formData.address) errors.address = "Address is required";
      if (!formData.size) errors.size = "Property size is required";
      if (!formData.valuation) errors.valuation = "Valuation is required";
    } else if (step === 2) {
      if (!formData.fractionSize)
        errors.fractionSize = "Fraction size is required";
      if (!formData.tokenPrice) errors.tokenPrice = "Token price is required";
      if (!formData.totalTokens)
        errors.totalTokens = "Total tokens is required";
    } else if (step === 3) {
      if (!formData.spvEntityName)
        errors.spvEntityName = "SPV Entity name is required";
      const { retail, institutional, developer } =
        formData.investorDistribution;
      const total = retail + institutional + developer;
      if (total !== 100) {
        errors.investorDistribution = `Total allocation must equal 100% (currently ${total}%)`;
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep((prev) => prev + 1);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before proceeding.",
        type: "error",
      });
    }
  };
  const prevStep = () => setStep((prev) => prev - 1);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
        type: "error",
      });
      return;
    }
    setIsSubmitting(true);
    
    try {
      // Map form data to property API structure
      const propertyData = {
        title: formData.propertyName,
        description: `Property tokenization request for ${formData.propertyName}`,
        location: formData.address,
        propertyType: "residential" as const, // Default to residential, could be made configurable
        valuation: formData.valuation,
        images: [], // Would need to handle image uploads
        features: [], // Could extract from documents or add to form
        yearBuilt: undefined, // Could add to form if needed
        squareFootage: formData.size ? parseInt(formData.size) : undefined,
        occupancyRate: undefined, // Could add to form if needed
        projectedAnnualReturn: undefined, // Could calculate from tokenization details
        managementFee: undefined, // Could add to form if needed
        dividendFrequency: "quarterly" as const, // Default value
        address: {
          street: formData.address,
          city: "", // Would need to parse from address
          state: "", // Would need to parse from address
          zipCode: "", // Would need to parse from address
          country: "", // Would need to parse from address
        },
      };

      await createProperty.mutateAsync(propertyData);
      
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      toast({
        title: "Success",
        description: "Property tokenization request submitted successfully!",
        type: "success",
      });
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was an error submitting your request. Please try again.",
        type: "error",
      });
    }
  };
  if (!user) {
    return (
      <div className="px-4 py-16 flex flex-col items-center justify-center text-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You need to connect your wallet to tokenize properties
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
  if (!isWhitelisted()) {
    return (
      <div className="px-4 py-16 flex flex-col items-center justify-center text-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>KYC Verification Required</CardTitle>
            <CardDescription>
              You need to complete KYC verification to tokenize properties
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link href="/kyc">
              <Button>Complete KYC</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }
  if (isSubmitted) {
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
          Tokenization Request Submitted
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
          Your property tokenization request has been submitted successfully.
          Our team will review your submission and contact you shortly.
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
        >
          <Link href="/marketplace">
            <Button>View Marketplace</Button>
          </Link>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <motion.h1
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
            className="text-3xl font-bold tracking-tighter"
          >
            Tokenize Your Property
          </motion.h1>
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
              delay: 0.1,
            }}
            className="text-muted-foreground mt-2"
          >
            Create compliant digital tokens representing real estate ownership
          </motion.p>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= i
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > i ? (
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
                    i
                  )}
                </div>
                <span
                  className={`text-xs mt-1 hidden sm:block ${
                    step >= i ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {i === 1
                    ? "Property"
                    : i === 2
                    ? "Tokenization"
                    : i === 3
                    ? "Ownership"
                    : i === 4
                    ? "Documents"
                    : "Confirm"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1 w-full bg-muted">
            <div
              className="h-1 bg-primary transition-all"
              style={{
                width: `${((step - 1) / 4) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1
                ? "Property Details"
                : step === 2
                ? "Tokenization Details"
                : step === 3
                ? "Ownership Structure"
                : step === 4
                ? "Legal Documents"
                : "Confirm Details"}
            </CardTitle>
            <CardDescription>
              {step === 1
                ? "Enter your property information"
                : step === 2
                ? "Configure tokenization parameters"
                : step === 3
                ? "Define the legal structure and investor distribution"
                : step === 4
                ? "Upload required legal documentation"
                : "Review and submit your tokenization request"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <PropertyDetailsStep
                    formData={formData}
                    handleChange={handleChange}
                    validationErrors={validationErrors}
                  />
                )}
                {step === 2 && (
                  <TokenizationDetailsStep
                    formData={formData}
                    handleChange={handleChange}
                    validationErrors={validationErrors}
                  />
                )}
                {step === 3 && (
                  <OwnershipStructureStep
                    formData={formData}
                    handleChange={handleChange}
                    handleDistributionChange={handleDistributionChange}
                    validationErrors={validationErrors}
                    jurisdictionOptions={jurisdictionOptions}
                    legalStructureOptions={legalStructureOptions}
                    tokenStandardOptions={tokenStandardOptions}
                  />
                )}
                {step === 4 && (
                  <DocumentsStep
                    formData={formData}
                    handleFileChange={handleFileChange}
                    documentTypes={documentTypes}
                  />
                )}
                {step === 5 && (
                  <ConfirmationStep
                    formData={formData}
                    documentTypes={documentTypes}
                  />
                )}
              </AnimatePresence>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
            >
              Back
            </Button>
            {step < 5 ? (
              <Button type="button" onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="relative"
              >
                {isSubmitting ? (
                  <>
                    <span className="opacity-0">
                      Submit Tokenization Request
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                    </span>
                  </>
                ) : (
                  "Confirm & Tokenize"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
