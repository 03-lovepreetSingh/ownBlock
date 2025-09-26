"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "default", size = "md" }: LogoProps) {
  const textColor = variant === "white" ? "text-white" : "text-foreground";
  const accentColor = variant === "white" ? "text-white" : "text-primary";
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  return (
    <Link href="/" className="flex items-center">
      <div className="flex items-center">
        <motion.div
          className={`relative ${sizeClasses[size]}`}
          initial={{
            rotate: -5,
          }}
          animate={{
            rotate: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${sizeClasses[size]} ${
              variant === "white" ? "text-white" : "text-primary"
            }`}
          >
            <path
              d="M20 3L37 12.5V27.5L20 37L3 27.5V12.5L20 3Z"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M20 10L30 15V25L20 30L10 25V15L20 10Z"
              fill="currentColor"
            />
            <path
              d="M20 17L23 18.5V21.5L20 23L17 21.5V18.5L20 17Z"
              fill={variant === "white" ? "white" : "#FFFFFF"}
            />
          </svg>
        </motion.div>
        <span
          className={`font-bold ml-2 tracking-tight ${textColor} ${
            size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"
          }`}
        >
          Own<span className={accentColor}>Block</span>
        </span>
      </div>
    </Link>
  );
}
