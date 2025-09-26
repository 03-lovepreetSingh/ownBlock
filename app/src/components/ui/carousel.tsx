"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
interface CarouselProps {
  images: string[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
}
export function Carousel({
  images,
  autoplay = true,
  interval = 5000,
  className = "",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, images.length]);
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: {
              type: "spring",
              stiffness: 300,
              damping: 30,
            },
            opacity: {
              duration: 0.2,
            },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-8 w-8"
        onClick={prevSlide}
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
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-8 w-8"
        onClick={nextSlide}
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
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </Button>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all ${
              currentIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
