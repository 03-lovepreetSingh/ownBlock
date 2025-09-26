"use client";
import React from "react";
import { motion } from "framer-motion";
interface Step {
  id: string;
  title: string;
  description?: string;
}
interface StepperProps {
  steps: Step[];
  currentStep: string;
  onStepClick?: (stepId: string) => void;
  orientation?: "horizontal" | "vertical";
}
export function Stepper({
  steps,
  currentStep,
  onStepClick,
  orientation = "horizontal",
}: StepperProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  if (orientation === "vertical") {
    return (
      <div className="flex flex-col space-y-4">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentStepIndex;
          return (
            <div key={step.id} className="flex">
              <div className="flex flex-col items-center mr-4">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isCompleted
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                  whileHover={
                    onStepClick
                      ? {
                          scale: 1.05,
                        }
                      : {}
                  }
                  onClick={() => onStepClick && onStepClick(step.id)}
                >
                  {isCompleted ? (
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
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 bg-border h-full mt-2"></div>
                )}
              </div>
              <div className="mt-1.5">
                <h3
                  className={`text-sm font-medium ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentStepIndex;
          return (
            <div key={step.id} className="flex flex-col items-center">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                    ? "bg-primary/80 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
                whileHover={
                  onStepClick
                    ? {
                        scale: 1.05,
                      }
                    : {}
                }
                onClick={() => onStepClick && onStepClick(step.id)}
              >
                {isCompleted ? (
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
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  index + 1
                )}
              </motion.div>
              <span
                className={`text-xs mt-1 text-center ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 h-1 w-full bg-muted">
        <motion.div
          className="h-1 bg-primary"
          initial={{
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
          }}
          animate={{
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      </div>
    </div>
  );
}
