# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for OwnBlock, a real estate tokenization platform that combines blockchain technology with regulatory compliance. The application enables users to tokenize properties into ERC3643 compliant tokens and invest in fractional ownership of real estate assets.

## Development Commands

### Common Commands
```bash
# Start development server with Turbopack
npm run dev

# Build the application with Turbopack
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Package Management
The project uses multiple package managers. Available lock files:
- `bun.lock` (Bun)
- `package-lock.json` (npm)
- `pnpm-lock.yaml` (pnpm)

## Architecture Overview

### Core Framework Stack
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS v4** with custom design system
- **Radix UI** components for accessibility
- **Framer Motion** for animations
- **next-themes** for dark/light mode support

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── (pages)/           # Main application pages
│   │   ├── dashboard/     # User dashboard
│   │   ├── marketplace/    # Property marketplace
│   │   ├── tokenize/      # Property tokenization
│   │   ├── kyc/           # KYC verification
│   │   ├── profile/       # User profile
│   │   ├── compliance/    # Compliance information
│   │   ├── transparency/  # Transparency reports
│   │   ├── demo/          # Demo flow
│   │   └── admin/         # Admin panel (conditional access)
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── layouts/           # Layout components (footer, navbar)
│   └── tokenize/         # Tokenization-specific components
├── context/
│   └── user-context.tsx   # User authentication state management
├── lib/
│   └── utils.ts           # Utility functions (clsx + twMerge)
└── types/                 # TypeScript type definitions
```

### State Management
- **Context API** for user authentication and KYC status
- **localStorage** for persisting user sessions
- User context provides: login, logout, completeKyc, isWhitelisted

### Authentication System
Currently implements a mock wallet authentication system:
- `src/context/user-context.tsx` manages user state
- Simulates wallet connection with mock addresses
- KYC verification workflow with pending/verified/rejected status
- Role-based access control (admin functionality for addresses starting with "0xa")

### UI Component System
- **shadcn/ui** components configured in `components.json`
- **Radix UI** primitives for accessibility
- **Lucide React** icons
- **Class Variance Authority (CVA)** for component variants
- **Tailwind CSS** with custom CSS variables for theming

### Key Features
1. **Property Tokenization**: ERC3643 compliant token creation
2. **Fractional Ownership**: Enable investments as small as 1%
3. **KYC Verification**: Identity verification for regulatory compliance
4. **Marketplace**: Browse and invest in tokenized properties
5. **Admin Panel**: Property and user management (conditional access)
6. **Responsive Design**: Mobile-first with responsive navigation

### Development Patterns
- **Client Components**: Use "use client" directive for interactive components
- **TypeScript**: Strict type checking enabled
- **Path Aliases**: `@/*` maps to `src/*` (configured in tsconfig.json)
- **Animation**: Framer Motion for smooth transitions and micro-interactions
- **Theme System**: Dark/light mode with system preference detection

### Styling Guidelines
- **Tailwind CSS v4** with PostCSS
- **CSS Variables** for theme customization
- **shadcn/ui** new-york style variant
- **Neutral base color** with primary accent
- **Responsive design** with mobile-first approach

### Component Organization
- **Base Components**: In `src/components/ui/` (shadcn/ui)
- **Layout Components**: In `src/components/layouts/`
- **Feature Components**: Organized by feature (e.g., tokenize/)
- **Page Components**: In respective app route directories

### Testing and Quality
- **ESLint** configuration for code quality
- **TypeScript** strict mode enabled
- **No specific test framework** currently configured

### Environment Notes
- Development server runs on port 3000 by default
- Uses **Turbopack** for fast development builds
- **Git repository** with clean working directory
- **Multiple package managers** present ( Bun, npm, pnpm)