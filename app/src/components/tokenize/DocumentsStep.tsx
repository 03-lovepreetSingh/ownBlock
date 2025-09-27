"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { FormData } from "../../app/tokenize/page";
interface DocumentsStepProps {
  formData: FormData;
  handleFileChange: (docType: string, file: File | null) => void;
  documentTypes: string[];
}
export function DocumentsStep({
  formData,
  handleFileChange,
  documentTypes,
}: DocumentsStepProps) {
  return (
    <motion.div
      key="step4"
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
      <h3 className="text-lg font-medium">Legal Documents</h3>
      <p className="text-sm text-muted-foreground">
        Upload the required legal documents for your property tokenization
      </p>
      <div className="space-y-4">
        {documentTypes.map((docType) => (
          <div key={docType} className="p-4 border border-border rounded-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
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
                <span>{docType}</span>
              </div>
              <div className="flex items-center gap-2">
                {formData.documents[docType].uploaded ? (
                  <>
                    <span className="text-xs text-green-500">Uploaded</span>
                    <Button variant="ghost" size="sm" className="text-primary">
                      View
                    </Button>
                  </>
                ) : (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileChange(docType, file);
                      }}
                      accept=".pdf,.doc,.docx"
                    />
                    <span className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                      Upload
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-muted rounded-md mt-4">
        <p className="text-sm">
          All documents must be in PDF format. Please ensure that all uploaded
          documents are valid and up-to-date. Our legal team will review these
          documents as part of the tokenization process.
        </p>
      </div>
    </motion.div>
  );
}
