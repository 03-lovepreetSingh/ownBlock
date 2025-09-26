import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../../components/ui/badge";
import { FormData } from "../../app/tokenize/page";
interface TokenizationDetailsStepProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  validationErrors: Record<string, string>;
}
export function TokenizationDetailsStep({
  formData,
  handleChange,
  validationErrors,
}: TokenizationDetailsStepProps) {
  return (
    <motion.div
      key="step2"
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
      className="space-y-4"
    >
      <div className="p-4 bg-muted rounded-md mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">ERC3643</Badge>
          <h4 className="text-sm font-medium">Compliant Tokenization</h4>
        </div>
        <p className="text-xs text-muted-foreground">
          Your property will be tokenized using the ERC3643 standard, ensuring
          regulatory compliance and KYC/AML requirements.
        </p>
      </div>
      <div>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
          Fraction Size (%)
        </label>
        <input
          type="text"
          name="fractionSize"
          value={formData.fractionSize}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Minimum fraction size (e.g., 1%)"
          required
        />
        {validationErrors.fractionSize && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.fractionSize}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
          Token Price ($)
        </label>
        <input
          type="text"
          name="tokenPrice"
          value={formData.tokenPrice}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Price per token"
          required
        />
        {validationErrors.tokenPrice && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.tokenPrice}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
          Total Tokens
        </label>
        <input
          type="text"
          name="totalTokens"
          value={formData.totalTokens}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Number of tokens to create"
          required
        />
        {validationErrors.totalTokens && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.totalTokens}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
          Expected Annual Return (%)
        </label>
        <input
          type="text"
          name="annualReturn"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Projected annual return (e.g., 8.5%)"
        />
      </div>
    </motion.div>
  );
}
