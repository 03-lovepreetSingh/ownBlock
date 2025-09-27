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
import { useProperties, Property } from "../../hooks/useProperties";
import { useMarketplaceTokens } from "../../hooks/useMarketplaceTokens";
// Real property data will be loaded from API
export default function MarketplacePage() {
  const { user, isWhitelisted } = useUser();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  // Fetch real properties from API
  const { data: properties = [], isLoading, error } = useProperties();
  
  // Fetch tokenized properties from marketplace
  const { data: marketplaceData, isLoading: isLoadingTokens } = useMarketplaceTokens({
    limit: 20,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Combine regular properties and tokenized properties
  const tokenizedProperties = marketplaceData?.tokens || [];
  const allProperties = [...properties, ...tokenizedProperties];

  // Filter properties based on multiple criteria
  const filteredProperties = allProperties
    .filter(
      (p) => {
        if (filter === "all") return true;
        if (filter === "tokenized") return "contractAddress" in p && p.contractAddress;
        if (filter === "traditional") return !("contractAddress" in p) || !p.contractAddress;
        return p.status?.toLowerCase() === filter.toLowerCase();
      }
    )
    .filter(
      (p) => {
        if (locationFilter === "all") return true;
        const addressStr = p.address 
          ? (typeof p.address === "string" ? p.address : p.address.city || "")
          : "";
        const locationStr = p.location || "";
        return addressStr.toLowerCase().includes(locationFilter.toLowerCase()) ||
               locationStr.toLowerCase().includes(locationFilter.toLowerCase());
      }
    )
    .filter(
      (p) => {
        if (searchQuery === "") return true;
        const title = p.title.toLowerCase();
        const addressStr = p.address 
          ? (typeof p.address === "string" ? p.address : p.address.city || "")
          : "";
        const locationStr = p.location || "";
        const query = searchQuery.toLowerCase();
        return title.includes(query) || 
               addressStr.includes(query) || 
               locationStr.includes(query);
      }
    );

  // Get unique locations for the filter
  const locations = [
    "all",
    ...new Set(
      allProperties.map((p) => {
        if (p.address && typeof p.address === "object" && p.address.city) {
          return p.address.city;
        }
        return p.location || "Unknown";
      })
    ),
  ];
  
  // Show loading state
  if (isLoading || isLoadingTokens) {
    return (
      <div className="w-full bg-background">
        <div className="px-4 py-12 md:py-16">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <motion.h1
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Property Marketplace
            </motion.h1>
            <motion.p
              className="max-w-[700px] text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover tokenized properties available for investment
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full bg-background">
        <div className="px-4 py-12 md:py-16">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <motion.h1
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Property Marketplace
            </motion.h1>
            <motion.p
              className="max-w-[700px] text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover tokenized properties available for investment
            </motion.p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Failed to load properties</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

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
                variant={filter === "tokenized" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("tokenized")}
              >
                Tokenized
              </Button>
              <Button
                variant={filter === "traditional" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("traditional")}
              >
                Traditional
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
function PropertyCard({ property, index, isWhitelisted, user }: {
  property: Property;
  index: number;
  isWhitelisted: boolean;
  user: any;
}) {
  // Calculate funding progress based on tokens sold vs total tokens
  const fundingProgress =
    property.availableSupply && property.totalSupply
      ? Math.round(((property.totalSupply - property.availableSupply) / property.totalSupply) * 100)
      : 0;

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
              src={
                property.images?.[0] ||
                "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=800&auto=format&fit=crop"
              }
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Badge
                variant={property.status === "active" ? "success" : "secondary"}
              >
                {property.status === "active" ? "Active" : "Coming Soon"}
              </Badge>
              {"contractAddress" in property && property.contractAddress && (
                <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">
                  Tokenized
                </Badge>
              )}
            </div>
          </div>
          <CardHeader>
            <CardTitle>{property.title}</CardTitle>
            <CardDescription>
              {typeof property.address === "string"
                ? property.address
                : property.address
                ? `${property.address.street}, ${property.address.city}, ${property.address.state}`
                : property.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Valuation</p>
                <p className="font-semibold">
                  ${property.valuation.toLocaleString()}
                </p>
              </div>
              {fundingProgress > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Funding</p>
                  <p className="font-semibold">{fundingProgress}%</p>
                </div>
              )}
            </div>
            {fundingProgress > 0 && (
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${fundingProgress}%`,
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

function PropertyCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <div className="relative overflow-hidden rounded-t-lg h-48 bg-muted animate-pulse"></div>
      <CardHeader>
        <div className="h-6 bg-muted rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-muted rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div>
            <div className="h-4 bg-muted rounded animate-pulse mb-1"></div>
            <div className="h-5 bg-muted rounded animate-pulse"></div>
          </div>
          <div>
            <div className="h-4 bg-muted rounded animate-pulse mb-1"></div>
            <div className="h-5 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-4"></div>
      </CardContent>
      <CardFooter>
        <div className="w-full h-10 bg-muted rounded animate-pulse"></div>
      </CardFooter>
    </Card>
  );
}
