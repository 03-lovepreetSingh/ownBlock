"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface Toast {
  id: string;
  title: string;
  description?: string;
  type: "default" | "success" | "error" | "warning";
}
interface ToasterContextType {
  toast: (props: Omit<Toast, "id">) => void;
}
const ToasterContext = createContext<ToasterContextType | undefined>(undefined);
export const useToast = () => {
  //   const context = useContext(ToasterContext);
  //   if (context === undefined) {
  //     throw new Error("useToast must be used within a ToasterProvider");
  //   }
  return context;
};
export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [
      ...prev,
      {
        ...toast,
        id,
      },
    ]);
  };
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toasts[0].id);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);
  return (
    <ToasterContext.Provider
      value={{
        toast: addToast,
      }}
    >
      {children}
      <div className="fixed bottom-0 right-0 z-50 p-4 space-y-2 max-w-xs w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.9,
              }}
              className={`rounded-lg border p-4 shadow-md ${
                toast.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300"
                  : toast.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300"
                  : toast.type === "warning"
                  ? "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-300"
                  : "bg-background border-border"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-sm">{toast.title}</h4>
                  {toast.description && (
                    <p className="text-xs mt-1">{toast.description}</p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToasterContext.Provider>
  );
}
// Legacy export for backward compatibility
export const Toaster = ToasterProvider;
