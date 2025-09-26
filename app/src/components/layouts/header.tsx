"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import { useUser } from "../../context/user-context";
import { Sidebar } from "./sidebar";
import { motion } from "framer-motion";
import { Logo } from "../logo";

export function Header() {
  const pathname = usePathname();
  const { user, login, logout, isWhitelisted } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <header className="sticky px-8 top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className=" flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen((prev) => !prev)}
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
          </div>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
                {pathname === item.path && (
                  <motion.div
                    className="absolute -bottom-[18px] left-0 right-0 h-0.5 bg-primary"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-4">
              {isWhitelisted() && (
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
                <Link href="/profile">
                  <Button variant="outline" size="sm">
                    Profile
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={login} className="px-6">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
}
