import React from "react";
import { motion } from "framer-motion";
import { FormData } from "../../pages/tokenize";
interface PropertyDetailsStepProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  validationErrors: Record<string, string>;
}
export function PropertyDetailsStep({
  formData,
  handleChange,
  validationErrors,
}: PropertyDetailsStepProps) {
  return (
    <motion.div
      key="step1"
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
      <div>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
          Property Name
        </label>
        <input
          type="text"
          name="propertyName"
          value={formData.propertyName}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter property name"
          required
        />
        {validationErrors.propertyName && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.propertyName}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
          Property Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter full address"
          required
        />
        {validationErrors.address && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.address}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
          Property Size (sq ft)
        </label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Size in square feet"
          required
        />
        {validationErrors.size && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.size}</p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
          Property Valuation ($)
        </label>
        <input
          type="text"
          name="valuation"
          value={formData.valuation}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter property value"
          required
        />
        {validationErrors.valuation && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.valuation}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
          Upload Property Images
        </label>
        <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
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
            className="h-8 w-8 text-muted-foreground mb-2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="text-sm text-muted-foreground">
            Drag & drop images or click to browse
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            (Max 5 images, JPG or PNG format)
          </p>
        </div>
      </div>
    </motion.div>
  );
}
