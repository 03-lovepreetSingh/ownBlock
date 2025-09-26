import React from "react";
import { motion } from "framer-motion";
import { FormData, InvestorDistribution } from "../../app/tokenize/page";
interface OwnershipStructureStepProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleDistributionChange: (
    type: keyof InvestorDistribution,
    value: number
  ) => void;
  validationErrors: Record<string, string>;
  jurisdictionOptions: string[];
  legalStructureOptions: string[];
  tokenStandardOptions: string[];
}
export function OwnershipStructureStep({
  formData,
  handleChange,
  handleDistributionChange,
  validationErrors,
  jurisdictionOptions,
  legalStructureOptions,
  tokenStandardOptions,
}: OwnershipStructureStepProps) {
  return (
    <motion.div
      key="step3"
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
        <h3 className="text-lg font-medium">Ownership Structure</h3>
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
            SPV Entity Name
          </label>
          <input
            type="text"
            name="spvEntityName"
            value={formData.spvEntityName}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="e.g., OwnBlock RE Holdings LLC"
            required
          />
          {validationErrors.spvEntityName && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.spvEntityName}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
            Jurisdiction
          </label>
          <select
            name="jurisdiction"
            value={formData.jurisdiction}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {jurisdictionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
            Legal Structure
          </label>
          <select
            name="legalStructure"
            value={formData.legalStructure}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {legalStructureOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
            Token Standard
          </label>
          <select
            name="tokenStandard"
            value={formData.tokenStandard}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {tokenStandardOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Investor Distribution</h3>
          {validationErrors.investorDistribution && (
            <span className="text-red-500 text-xs">
              {validationErrors.investorDistribution}
            </span>
          )}
        </div>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Retail Investors</label>
              <span className="text-sm">
                {formData.investorDistribution.retail}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.investorDistribution.retail}
              onChange={(e) =>
                handleDistributionChange("retail", parseInt(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">
                Institutional Investors
              </label>
              <span className="text-sm">
                {formData.investorDistribution.institutional}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.investorDistribution.institutional}
              onChange={(e) =>
                handleDistributionChange(
                  "institutional",
                  parseInt(e.target.value)
                )
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Property Developer</label>
              <span className="text-sm">
                {formData.investorDistribution.developer}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.investorDistribution.developer}
              onChange={(e) =>
                handleDistributionChange("developer", parseInt(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
        </div>
        <div className="flex justify-between text-sm pt-2">
          <span>Total:</span>
          <span
            className={`font-medium ${
              formData.investorDistribution.retail +
                formData.investorDistribution.institutional +
                formData.investorDistribution.developer !==
              100
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {formData.investorDistribution.retail +
              formData.investorDistribution.institutional +
              formData.investorDistribution.developer}
            %
          </span>
        </div>
      </div>
    </motion.div>
  );
}
