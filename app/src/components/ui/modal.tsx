"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  if (!isMounted) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              className="bg-background border rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden"
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-semibold">{title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">{children}</div>
              {footer && <div className="p-4 border-t">{footer}</div>}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
