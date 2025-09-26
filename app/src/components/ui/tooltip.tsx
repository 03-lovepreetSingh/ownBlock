"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}
export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const positions = {
    top: {
      container: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
      arrow:
        "top-full left-1/2 transform -translate-x-1/2 border-t-foreground border-x-transparent border-b-transparent",
    },
    bottom: {
      container: "top-full left-1/2 transform -translate-x-1/2 mt-2",
      arrow:
        "bottom-full left-1/2 transform -translate-x-1/2 border-b-foreground border-x-transparent border-t-transparent",
    },
    left: {
      container: "right-full top-1/2 transform -translate-y-1/2 mr-2",
      arrow:
        "left-full top-1/2 transform -translate-y-1/2 border-l-foreground border-y-transparent border-r-transparent",
    },
    right: {
      container: "left-full top-1/2 transform -translate-y-1/2 ml-2",
      arrow:
        "right-full top-1/2 transform -translate-y-1/2 border-r-foreground border-y-transparent border-l-transparent",
    },
  };
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute z-50 ${positions[side].container}`}
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            transition={{
              duration: 0.15,
            }}
          >
            <div className="bg-foreground text-background rounded-md py-1 px-2 text-xs whitespace-nowrap">
              {content}
              <div
                className={`absolute w-0 h-0 border-4 ${positions[side].arrow}`}
              ></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
