"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}
interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}
export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
  return (
    <div className="w-full">
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium relative ${
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="tab-indicator"
              />
            )}
          </button>
        ))}
      </div>
      <div className="relative">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: activeTab === tab.id ? 1 : 0,
              y: activeTab === tab.id ? 0 : 10,
              position: activeTab === tab.id ? "relative" : "absolute",
              zIndex: activeTab === tab.id ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="w-full"
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
