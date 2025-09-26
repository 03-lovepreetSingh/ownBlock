"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Tooltip } from "./ui/tooltip";
interface EcosystemIntegrationProps {
  variant?: "sidebar" | "full";
}
export function EcosystemIntegration({
  variant = "full",
}: EcosystemIntegrationProps) {
  const integrations = [
    {
      name: "Celo Payment",
      description: "Purchase tokens using cUSD stablecoin",
      status: "active",
      icon: (
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
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      ),
    },
    {
      name: "Ubeswap Liquidity",
      description: "Add tokens to Ubeswap liquidity pools",
      status: "coming-soon",
      icon: (
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
        >
          <path d="M12 2v20M2 12h20M7 12a5 5 0 0 1 5-5M12 17a5 5 0 0 0 5-5"></path>
        </svg>
      ),
    },
    {
      name: "Secondary Market",
      description: "Trade tokens on secondary markets",
      status: "coming-soon",
      icon: (
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
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
    },
    {
      name: "DAO Governance",
      description: "Participate in property management decisions",
      status: "coming-soon",
      icon: (
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
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
  ];
  if (variant === "sidebar") {
    return (
      <div className="p-4 bg-muted/40 rounded-lg">
        <h3 className="text-sm font-medium mb-3">Ecosystem Integrations</h3>
        <div className="space-y-2">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{
                opacity: 0,
                x: -10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="mr-2 text-muted-foreground">
                  {integration.icon}
                </div>
                <span className="text-xs">{integration.name}</span>
              </div>
              <Badge
                variant={
                  integration.status === "active" ? "success" : "secondary"
                }
                className="text-[10px] py-0 px-1.5"
              >
                {integration.status === "active" ? "Live" : "Soon"}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Ecosystem Integrations</h2>
        <Badge variant="info">Celo Powered</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.name}
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
                <div className="mr-2 text-primary">{integration.icon}</div>
                <span className="font-medium">{integration.name}</span>
              </div>
              <Badge
                variant={
                  integration.status === "active" ? "success" : "secondary"
                }
              >
                {integration.status === "active" ? "Active" : "Coming Soon"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {integration.description}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-muted/40 rounded-md">
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
            className="mr-2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <span className="text-sm font-medium">
            Powered by Integra Asset Operating System
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          OwnBlock leverages Integra's Asset Operating System for seamless
          integration with Celo's DeFi ecosystem. Real estate tokens can be used
          across multiple platforms while maintaining compliance.
        </p>
      </div>
    </div>
  );
}
