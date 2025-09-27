"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import { Tooltip } from "./ui/tooltip";
interface ComplianceBadgeProps {
  type: "erc3643" | "kyc" | "aml" | "accredited" | "restricted";
  status?: "active" | "pending" | "denied";
  showDetails?: boolean;
}
export function ComplianceBadge({
  type,
  status = "active",
  showDetails = false,
}: ComplianceBadgeProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(showDetails);
  const badgeInfo = {
    erc3643: {
      title: "ERC-3643 Compliant",
      description:
        "This token implements the ERC-3643 standard for regulated security tokens with on-chain compliance and transfer restrictions.",
      learnMoreLink: "/compliance#erc3643",
      tooltipContent:
        "ERC-3643 compliant token with on-chain transfer restrictions",
      variant: "info",
      icon: (
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
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      ),
    },
    kyc: {
      title: "KYC Verification",
      description:
        "Know Your Customer verification confirms your identity and ensures compliance with anti-money laundering regulations.",
      learnMoreLink: "/kyc",
      tooltipContent:
        status === "active"
          ? "KYC verification completed and approved"
          : status === "pending"
          ? "KYC verification in progress"
          : "KYC verification required",
      variant:
        status === "active"
          ? "success"
          : status === "pending"
          ? "warning"
          : "destructive",
      icon: (
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
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
    },
    aml: {
      title: "AML Compliant",
      description:
        "Anti-Money Laundering checks have been completed and verified for this account or property.",
      learnMoreLink: "/compliance#aml",
      tooltipContent: "Anti-Money Laundering checks completed",
      variant: "success",
      icon: (
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
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
    },
    accredited: {
      title: "Accredited Investor",
      description:
        "This account has been verified as an accredited investor, eligible for certain investment opportunities.",
      learnMoreLink: "/compliance#accredited",
      tooltipContent: "Accredited investor status verified",
      variant: "info",
      icon: (
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
          <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path>
          <path d="M15 7h6v6"></path>
        </svg>
      ),
    },
    restricted: {
      title: "Transfer Restricted",
      description:
        "These tokens can only be transferred between whitelisted addresses that have completed KYC verification.",
      learnMoreLink: "/compliance#transfer-restrictions",
      tooltipContent: "Transfers restricted to whitelisted addresses only",
      variant: "warning",
      icon: (
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
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
    },
  };
  const info = badgeInfo[type];
  const handleBadgeClick = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };
  const badgeContent = (
    <Tooltip content={info.tooltipContent}>
      <div
        className="cursor-pointer"
        onClick={handleBadgeClick}
      >
        <Badge
          variant={info.variant as any}
          animated
        >
          <span className="flex items-center">
            {info.icon}
            {status === "active"
              ? info.title
              : status === "pending"
              ? `${info.title} Pending`
              : `${info.title} Required`}
          </span>
        </Badge>
      </div>
    </Tooltip>
  );
  return (
    <div>
      <motion.div
        initial={{
          opacity: 0,
          y: 5,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {badgeContent}
      </motion.div>
      <AnimatePresence>
        {isDetailsOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-3 bg-muted/30 border border-muted rounded-md text-sm">
              <p className="mb-2">{info.description}</p>
              <a
                href={info.learnMoreLink}
                className="text-xs text-primary hover:underline"
              >
                Learn more about {info.title}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
