import React from "react";
import { motion } from "framer-motion";
import { FormData } from "../../app/tokenize/page";
interface ConfirmationStepProps {
  formData: FormData;
  documentTypes: string[];
}
export function ConfirmationStep({
  formData,
  documentTypes,
}: ConfirmationStepProps) {
  return (
    <motion.div
      key="step5"
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -20,
      }}
      transition={{
        duration: 0.3,
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Property Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Property Name
            </h4>
            <p>{formData.propertyName}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Address
            </h4>
            <p>{formData.address}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Size</h4>
            <p>{formData.size} sq ft</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Valuation
            </h4>
            <p>${formData.valuation}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-lg font-medium">Tokenization Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Fraction Size
            </h4>
            <p>{formData.fractionSize}%</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Token Price
            </h4>
            <p>${formData.tokenPrice}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Total Tokens
            </h4>
            <p>{formData.totalTokens}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-lg font-medium">Ownership Structure</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              SPV Entity
            </h4>
            <p>{formData.spvEntityName}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Jurisdiction
            </h4>
            <p>{formData.jurisdiction}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Legal Structure
            </h4>
            <p>{formData.legalStructure}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Token Standard
            </h4>
            <p>{formData.tokenStandard}</p>
          </div>
        </div>
        <div className="pt-2">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Investor Distribution
          </h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Retail Investors</span>
                <span className="text-sm">
                  {formData.investorDistribution.retail}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${formData.investorDistribution.retail}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Institutional</span>
                <span className="text-sm">
                  {formData.investorDistribution.institutional}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${formData.investorDistribution.institutional}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Property Developer</span>
                <span className="text-sm">
                  {formData.investorDistribution.developer}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{
                    width: `${formData.investorDistribution.developer}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2 pt-4 border-t border-border">
        <h3 className="text-lg font-medium">Legal Documents</h3>
        <ul className="space-y-1">
          {documentTypes.map((docType) => (
            <li key={docType} className="flex items-center gap-2 text-sm">
              {formData.documents[docType].uploaded ? (
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
              ) : (
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
                  className="text-yellow-500"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              )}
              <span>
                {docType}{" "}
                {formData.documents[docType].uploaded
                  ? "(Uploaded)"
                  : "(Missing)"}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-muted rounded-md mt-4">
        <p className="text-sm">
          By submitting this form, you confirm that you are the legal owner of
          this property or authorized to tokenize it, and that all information
          provided is accurate. Your property will be reviewed by our legal team
          before tokenization is finalized.
        </p>
      </div>
    </motion.div>
  );
}
