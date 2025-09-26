"use client";
import React from "react";
import { motion } from "framer-motion";
interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
    | "success"
    | "warning"
    | "info";
  className?: string;
  animated?: boolean;
}
export function Badge({
  children,
  variant = "default",
  className = "",
  animated = false,
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    success:
      "bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/30",
    warning:
      "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/30",
    info: "bg-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-500/30",
  };
  const badgeContent = (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
  if (animated) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {badgeContent}
      </motion.div>
    );
  }
  return badgeContent;
}
