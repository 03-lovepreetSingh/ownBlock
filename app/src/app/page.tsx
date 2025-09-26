"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

export default function HomePage() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-muted border-transparent text-muted-foreground mb-2"
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
                    className="mr-1"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                  Compliant Tokenization
                </motion.div>
                <motion.h1
                  className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  Tokenize Real Estate with OwnBlock
                </motion.h1>
                <motion.p
                  className="max-w-[600px] text-muted-foreground md:text-xl"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                  }}
                >
                  Transform properties into digital assets. Invest in fractional
                  ownership with regulatory compliance and blockchain security.
                </motion.p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                  }}
                >
                  <Link href="/marketplace">
                    <Button size="lg">Start Investing</Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                  }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={scrollToFeatures}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </div>
            <motion.div
              className="flex items-center justify-center"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.4,
              }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary to-primary/50 opacity-75 blur-xl"></div>
                <div className="relative h-[400px] w-full overflow-hidden rounded-xl border">
                  <img
                    alt="Modern building"
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
      >
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <motion.div
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-primary/10 border-primary/20 text-primary mb-2"
              >
                Features
              </motion.div>
              <motion.h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                Revolutionizing Real Estate Investment
              </motion.h2>
              <motion.p
                className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
              >
                Our platform combines blockchain technology with regulatory
                compliance to create a new paradigm for real estate ownership.
              </motion.p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            {[
              {
                title: "Compliant Tokenization",
                description:
                  "ERC3643 compliant tokens ensuring regulatory requirements are met across jurisdictions.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 mb-4 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: "Fractional Ownership",
                description:
                  "Invest in high-value properties with as little as 1% ownership through tokenization.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 mb-4 text-primary"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: "KYC Verification",
                description:
                  "Seamless identity verification ensuring all investors meet regulatory requirements.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-10 w-10 mb-4 text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * (index + 1),
                }}
              >
                {feature.icon}
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
              }}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-primary/10 border-primary/20 text-primary mb-2"
            >
              Process
            </motion.div>
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              How It Works
            </motion.h2>
            <motion.p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
            >
              Our streamlined process makes property tokenization and investment
              simple and secure
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                title: "Property Verification",
                description:
                  "We verify property details and legal documentation to ensure compliance and authenticity.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Tokenization",
                description:
                  "The property is tokenized using ERC3643 standard, creating compliant digital ownership shares.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v12"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Investment",
                description:
                  "Investors can purchase tokens representing fractional ownership in the property.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                ),
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Step {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-muted/30">
        <div className="px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Start Tokenizing?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join the future of real estate investment with our compliant
                tokenization platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/marketplace">
                <Button size="lg">Explore Marketplace</Button>
              </Link>
              <Link href="/tokenize">
                <Button variant="outline" size="lg">
                  Tokenize Property
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
