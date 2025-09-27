# OwnBlock Backend

A modern real estate tokenization platform backend built with Next.js, TypeScript, Drizzle ORM, and PostgreSQL.

## Features

- 🔐 **Authentication**: Google OAuth integration with NextAuth.js
- 🏠 **Property Tokenization**: Create and manage tokenized real estate properties
- 💰 **Investment Platform**: Allow users to invest in property tokens
- 📊 **Order Book**: Buy/sell property tokens with market orders
- 💸 **Dividend Management**: Automated dividend distribution to token holders
- 🛡️ **KYC Verification**: Know Your Customer verification system
- 🔒 **Security**: Input validation, rate limiting, and role-based access control
- 📚 **Type Safety**: Full TypeScript implementation with Drizzle ORM

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js with Google Provider
- **Validation**: Zod for runtime type validation
- **API**: RESTful API with Next.js API Routes

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/ownblock
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Set up the database:
```bash
# Push schema to database
npm run db:push

# Or generate and run migrations
npm run db:generate
npm run db:migrate
```

5. Run the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

## Database Schema

### Core Tables

- **users**: User accounts and profiles
- **kycRecords**: KYC verification data
- **properties**: Real estate property listings
- **propertyTokens**: Tokenized property shares
- **investments**: User investment records
- **transactions**: Transaction history
- **orderBook**: Buy/sell orders
- **dividends**: Dividend distributions
- **dividendPayments**: Individual dividend payments to users

## API Endpoints

### Authentication
- `GET /api/auth/signin` - Google OAuth sign-in
- `GET /api/auth/callback/google` - OAuth callback
- `GET /api/auth/signout` - Sign out

### Users
- `GET /api/users/me` - Get current user
- `PATCH /api/users/me` - Update user profile

### KYC
- `POST /api/kyc` - Submit KYC application
- `PATCH /api/kyc/:id` - Update KYC status (Admin)

### Properties
- `GET /api/properties` - List properties
- `POST /api/properties` - Create property (Admin)

### Property Tokens
- `GET /api/property-tokens/:id` - Get token details

### Investments
- `POST /api/investments` - Create investment
- `GET /api/investments/me` - Get user investments

### Transactions
- `POST /api/transactions` - Record transaction

### Order Book
- `GET /api/order-book` - List orders
- `POST /api/order-book` - Create order

### Dividends
- `GET /api/dividends` - List dividends
- `POST /api/dividends` - Create dividend (Admin)

### Dividend Payments
- `GET /api/dividend-payments` - List payments (Admin)
- `POST /api/dividend-payments` - Process payments (Admin)
- `GET /api/dividend-payments/me` - Get user payments

## Security Features

### Authentication & Authorization
- Google OAuth integration
- JWT-based session management
- Role-based access control (User/Admin)
- Protected API routes with middleware

### Input Validation
- Zod schema validation for all API inputs
- Type-safe request/response handling
- SQL injection prevention via Drizzle ORM

### Rate Limiting
- General API: 100 requests per 15 minutes
- Authentication: 5 requests per 15 minutes
- Sensitive operations: 10 requests per 5 minutes

### Data Protection
- Environment variable configuration
- No sensitive data in version control
- Secure session management

## Development

### Database Commands
```bash
# Generate migration files
npm run db:generate

# Push schema changes (development)
npm run db:push

# Run migrations (production)
npm run db:migrate

# Open Drizzle Studio
npm run db:studio
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Run TypeScript check
npm run type-check

# Run tests
npm run test
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables
3. Run database migrations
4. Start the production server:
```bash
npm start
```

## API Documentation

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for detailed endpoint documentation with examples.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.