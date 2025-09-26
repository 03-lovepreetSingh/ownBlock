"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useUser } from "../../context/user-context";
// Sample property data
const properties = [
  {
    id: "1",
    title: "Luxury Apartment Complex",
    location: "Miami, FL",
    valuation: "$12,500,000",
    tokenStatus: "Active",
    fundingProgress: 68,
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Commercial Office Building",
    location: "New York, NY",
    valuation: "$28,750,000",
    tokenStatus: "Active",
    fundingProgress: 42,
    image:
      "https://images.unsplash.com/photo-1554435493-93422e8d1a41?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Residential Development",
    location: "Austin, TX",
    valuation: "$8,200,000",
    tokenStatus: "Coming Soon",
    fundingProgress: 0,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Retail Shopping Center",
    location: "Chicago, IL",
    valuation: "$15,800,000",
    tokenStatus: "Active",
    fundingProgress: 87,
    image:
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Industrial Warehouse",
    location: "Seattle, WA",
    valuation: "$6,400,000",
    tokenStatus: "Active",
    fundingProgress: 24,
    image:
      "https://images.unsplash.com/photo-1565953554309-d181306db7d5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Beachfront Hotel",
    location: "San Diego, CA",
    valuation: "$32,100,000",
    tokenStatus: "Coming Soon",
    fundingProgress: 0,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  },
];
export default function MarketplacePage() {
  const { user, isWhitelisted } = useUser();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  // Filter properties based on multiple criteria
  const filteredProperties = properties
    .filter(
      (p) =>
        filter === "all" || p.tokenStatus.toLowerCase() === filter.toLowerCase()
    )
    .filter(
      (p) => locationFilter === "all" || p.location.includes(locationFilter)
    )
    .filter(
      (p) =>
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  // Get unique locations for the filter
  const locations = [
    "all",
    ...new Set(properties.map((p) => p.location.split(",")[0].trim())),
  ];
  return (
    <div className="w-full bg-background">
      <div className="px-4 py-12 md:py-16">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <motion.h1
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
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
            Property Marketplace
          </motion.h1>
          <motion.p
            className="max-w-[700px] text-muted-foreground md:text-xl"
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
            Discover tokenized properties available for investment
          </motion.p>
          {!user && (
            <motion.div
              className="mt-4 p-4 bg-muted rounded-lg"
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
              <p className="text-sm">
                Connect your wallet and complete KYC verification to invest in
                properties
              </p>
            </motion.div>
          )}
          {user && !isWhitelisted() && (
            <motion.div
              className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800"
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
              <p className="text-sm">
                Complete KYC verification to unlock investment capabilities
              </p>
              <Link
                href="/kyc"
                className="text-sm font-medium text-primary hover:underline"
              >
                Complete KYC →
              </Link>
            </motion.div>
          )}
          <motion.div
            className="w-full max-w-3xl mt-6 space-y-4"
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
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
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
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background"
                />
              </div>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3"
              >
                <option value="all">All Locations</option>
                {locations
                  .filter((l) => l !== "all")
                  .map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All Properties
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("active")}
              >
                Active Offerings
              </Button>
              <Button
                variant={filter === "coming soon" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("coming soon")}
              >
                Coming Soon
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
                isWhitelisted={isWhitelisted()}
                user={!!user}
              />
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
              <p className="text-muted-foreground">
                No properties match your search criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilter("all");
                  setLocationFilter("all");
                  setSearchQuery("");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function PropertyCard({ property, index, isWhitelisted, user }) {
  return (
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
        delay: 0.1 * index,
      }}
      whileHover={{
        y: -5,
      }}
    >
      <Link href={`/property/${property.id}`}>
        <Card className="h-full overflow-hidden hover:shadow-md transition-all">
          <div className="relative overflow-hidden rounded-t-lg h-48">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <Badge
                variant={
                  property.tokenStatus === "Active" ? "success" : "secondary"
                }
              >
                {property.tokenStatus}
              </Badge>
            </div>
          </div>
          <CardHeader>
            <CardTitle>{property.title}</CardTitle>
            <CardDescription>{property.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Valuation</p>
                <p className="font-semibold">{property.valuation}</p>
              </div>
              {property.fundingProgress > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Funding</p>
                  <p className="font-semibold">{property.fundingProgress}%</p>
                </div>
              )}
            </div>
            {property.fundingProgress > 0 && (
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${property.fundingProgress}%`,
                  }}
                ></div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {!user ? (
              <Button className="w-full" variant="outline">
                Connect Wallet to View
              </Button>
            ) : isWhitelisted ? (
              <Button className="w-full">View Property</Button>
            ) : (
              <div className="w-full">
                <Button className="w-full" variant="outline" disabled>
                  KYC Required to Buy
                </Button>
                <Link
                  href="/kyc"
                  className="text-xs text-center block mt-2 text-primary hover:underline"
                >
                  Complete KYC Verification
                </Link>
              </div>
            )}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
