"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useUser } from "../context/user-context";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ConnectButton from "./connect-button";
import { useSession } from "next-auth/react";
export default function Navbar() {
  const pathname = usePathname();
  const { user, login, logout, isWhitelisted, isAuthenticated, userProfile } = useUser();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/marketplace",
      label: "Marketplace",
    },
    {
      path: "/tokenize",
      label: "Tokenize",
    },
    ...(user
      ? [
          {
            path: "/dashboard",
            label: "Dashboard",
          },
        ]
      : []),
    {
      path: "/compliance",
      label: "Compliance",
    },
    {
      path: "/transparency",
      label: "Transparency",
    },
    {
      path: "/demo",
      label: "Demo Flow",
    },
  ];
  return (
    <header className="sticky px-8 top-0 z-[60] w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="focus:outline-none"
                >
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
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle>
                    <Logo size="sm" />
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === item.path
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {isAuthenticated && session?.user && (
                    <>
                      <div className="h-px bg-border my-2" />
                      <div className="flex items-center gap-3 px-3 py-2">
                        <Avatar className="h-8 w-8">
                          {session.user.image && (
                            <AvatarImage 
                              src={session.user.image} 
                              alt={session.user.name || session.user.email || "User"} 
                            />
                          )}
                          <AvatarFallback className="text-xs">
                            {session.user.name 
                              ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
                              : session.user.email?.[0]?.toUpperCase() || 'U'
                            }
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {session.user.name || 'User'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {session.user.email}
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/kyc"
                        className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        onClick={() => setIsOpen(false)}
                      >
                        KYC Verification
                      </Link>
                      {userProfile?.role === "admin" && (
                        <Link
                          href="/admin"
                          className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                          onClick={() => setIsOpen(false)}
                        >
                          Admin
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        className="justify-start px-3"
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {/* Desktop navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <Link
                    href={item.path}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent",
                      pathname === item.path && "text-primary font-medium"
                    )}
                  >
                    {item.label}
                    {pathname === item.path && (
                      <motion.div
                        className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary"
                        layoutId="navbar-indicator"
                      />
                    )}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated && session?.user ? (
            <div className="flex items-center gap-4">
              {userProfile?.kycStatus === "verified" && (
                <motion.span
                  className="hidden md:inline-flex items-center"
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
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm">KYC Verified</span>
                </motion.span>
              )}
              <div className="hidden sm:flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Avatar className="h-6 w-6">
                        {session.user.image && (
                          <AvatarImage 
                            src={session.user.image} 
                            alt={session.user.name || session.user.email || "User"} 
                          />
                        )}
                        <AvatarFallback className="text-xs">
                          {session.user.name 
                            ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
                            : session.user.email?.[0]?.toUpperCase() || 'U'
                          }
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline-block">
                        {session.user.name || session.user.email?.split('@')[0] || 'User'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user.name || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard">
                      <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    </Link>
                    <Link href="/kyc">
                      <DropdownMenuItem>KYC Verification</DropdownMenuItem>
                    </Link>
                    {userProfile?.role === "admin" && (
                      <Link href="/admin">
                        <DropdownMenuItem>Admin</DropdownMenuItem>
                      </Link>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </header>
  );
}
