"use client";
import React from "react";
import { motion } from "framer-motion";
import { Tabs } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Tooltip } from "./ui/tooltip";
interface Document {
  name: string;
  type: string;
  hash: string;
  verified: boolean;
  verifier?: string;
  date: string;
}
interface Attestation {
  name: string;
  issuer: string;
  did: string;
  date: string;
  status: "valid" | "expired" | "revoked";
}
interface OwnershipRecord {
  address: string;
  tokens: number;
  percentage: number;
  date: string;
  type: "retail" | "institutional" | "developer";
}
interface AssetPassportProps {
  propertyId: string;
  documents: Document[];
  attestations: Attestation[];
  ownershipRecords: OwnershipRecord[];
}
export function AssetPassport({
  propertyId,
  documents,
  attestations,
  ownershipRecords,
}: AssetPassportProps) {
  const tabs = [
    {
      id: "documents",
      label: "Documents",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Verified Documents</h3>
          <p className="text-sm text-muted-foreground mb-4">
            All documents are cryptographically verified and stored on IPFS
          </p>
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.hash}
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
                  delay: index * 0.1,
                }}
                className="p-3 border rounded-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
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
                      className="mr-2 text-muted-foreground"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <div>
                      <p className="font-medium text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {doc.verified ? (
                      <Badge variant="success">Verified</Badge>
                    ) : (
                      <Badge variant="warning">Pending</Badge>
                    )}
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t text-xs">
                  <div className="flex justify-between items-center">
                    <Tooltip content="IPFS Content Identifier">
                      <span className="text-muted-foreground">
                        IPFS: {doc.hash.substring(0, 16)}...
                      </span>
                    </Tooltip>
                    <span className="text-muted-foreground">{doc.date}</span>
                  </div>
                  {doc.verifier && (
                    <div className="mt-1">
                      <Tooltip content="Entity that verified this document">
                        <span className="text-muted-foreground">
                          Verified by: {doc.verifier}
                        </span>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "attestations",
      label: "Attestations",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Property Attestations</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Verifiable credentials and attestations from trusted authorities
          </p>
          <div className="space-y-3">
            {attestations.map((attestation, index) => (
              <motion.div
                key={attestation.did}
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
                  delay: index * 0.1,
                }}
                className="p-3 border rounded-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
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
                      className="mr-2 text-muted-foreground"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <div>
                      <p className="font-medium text-sm">{attestation.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Issued by: {attestation.issuer}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      variant={
                        attestation.status === "valid"
                          ? "success"
                          : attestation.status === "expired"
                          ? "warning"
                          : "destructive"
                      }
                    >
                      {attestation.status.charAt(0).toUpperCase() +
                        attestation.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t text-xs">
                  <div className="flex justify-between items-center">
                    <Tooltip content="Decentralized Identifier">
                      <span className="text-muted-foreground">
                        DID: {attestation.did.substring(0, 16)}...
                      </span>
                    </Tooltip>
                    <span className="text-muted-foreground">
                      {attestation.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "ownership",
      label: "Ownership",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Token Ownership</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Current distribution of property ownership tokens
          </p>
          <div className="mb-6">
            <div className="h-48 w-full flex items-center justify-center">
              <div className="relative w-full max-w-xs">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="#f3f4f6" />
                  {/* Retail slice - Starting at 0 degrees */}
                  <motion.path
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.2,
                    }}
                    d="M50 10 A40 40 0 0 1 88.2 68.2 L50 50"
                    fill="#10b981"
                  />
                  {/* Institutional slice - Starting where retail ends */}
                  <motion.path
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.4,
                    }}
                    d="M88.2 68.2 A40 40 0 0 1 30 89.3 L50 50"
                    fill="#3b82f6"
                  />
                  {/* Developer slice - Completing the circle */}
                  <motion.path
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.6,
                    }}
                    d="M30 89.3 A40 40 0 0 1 50 10 L50 50"
                    fill="#8b5cf6"
                  />
                  <circle cx="50" cy="50" r="25" fill="white" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Total Supply
                    </p>
                    <p className="text-xl font-bold">100,000</p>
                    <p className="text-xs text-muted-foreground">Tokens</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Retail</span>
                </div>
                <p className="font-medium">60%</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Institutional</span>
                </div>
                <p className="font-medium">30%</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Developer</span>
                </div>
                <p className="font-medium">10%</p>
              </div>
            </div>
          </div>
          <h4 className="font-medium text-sm">Top Token Holders</h4>
          <div className="space-y-2">
            {ownershipRecords.map((record, index) => (
              <motion.div
                key={record.address}
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
                  delay: index * 0.1,
                }}
                className="p-2 border rounded-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium truncate">
                      {record.address.substring(0, 6)}...
                      {record.address.substring(record.address.length - 4)}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Badge
                        variant={
                          record.type === "retail"
                            ? "success"
                            : record.type === "institutional"
                            ? "info"
                            : "secondary"
                        }
                        className="mr-1"
                      >
                        {record.type}
                      </Badge>
                      <span>Since {record.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {record.tokens} tokens
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {record.percentage}%
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Asset Passport</h2>
        <div className="flex items-center">
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
            className="mr-1"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span className="text-xs">
            Asset ID: {propertyId.substring(0, 8)}...
          </span>
        </div>
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
}
