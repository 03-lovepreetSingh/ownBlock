# OwnBlock API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

OwnBlock uses NextAuth.js with Google OAuth for authentication. Most API endpoints require authentication via Bearer token in the Authorization header.

```
Authorization: Bearer <session_token>
```

## Rate Limiting

- General API: 100 requests per 15 minutes per IP
- Authentication endpoints: 5 requests per 15 minutes per IP
- Sensitive operations: 10 requests per 5 minutes per IP

## API Endpoints

### Authentication

#### GET /api/auth/signin
- Initiates Google OAuth sign-in flow
- No authentication required

#### GET /api/auth/callback/google
- Handles Google OAuth callback
- No authentication required

#### GET /api/auth/signout
- Signs out the current user
- Authentication required

### User Management

#### GET /api/users/me
- Get current user profile
- Authentication required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "address": "123 Main St",
    "phone": "+1234567890",
    "kycStatus": "verified",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### PATCH /api/users/me
- Update current user profile
- Authentication required

**Request Body:**
```json
{
  "name": "John Doe",
  "address": "123 Main St",
  "phone": "+1234567890"
}
```

### KYC (Know Your Customer)

#### POST /api/kyc
- Submit KYC application
- Authentication required

**Request Body:**
```json
{
  "documentType": "passport",
  "documentNumber": "A12345678",
  "documentImage": "base64_encoded_image",
  "selfieImage": "base64_encoded_image"
}
```

#### PATCH /api/kyc/:id
- Update KYC status (Admin only)
- Authentication + Admin role required

**Request Body:**
```json
{
  "status": "verified"
}
```

### Properties

#### GET /api/properties
- List all properties
- Optional authentication (public data)

**Query Parameters:**
- `status`: Filter by status (active, sold_out, cancelled)
- `limit`: Number of results (default: 50)
- `offset`: Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "property-id",
      "title": "Luxury Apartment Complex",
      "description": "Premium residential complex",
      "location": "New York, NY",
      "propertyType": "residential",
      "totalValue": 1000000,
      "totalTokens": 10000,
      "tokensSold": 5000,
      "fundsRaised": 500000,
      "status": "active",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### POST /api/properties
- Create new property (Admin only)
- Authentication + Admin role required

**Request Body:**
```json
{
  "title": "Luxury Apartment Complex",
  "description": "Premium residential complex",
  "location": "New York, NY",
  "propertyType": "residential",
  "totalValue": 1000000,
  "totalTokens": 10000,
  "minimumInvestment": 1000
}
```

### Property Tokens

#### GET /api/property-tokens/:id
- Get property token details
- Optional authentication (public data)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "token-id",
    "propertyId": "property-id",
    "tokenSymbol": "PROP123",
    "totalSupply": 10000,
    "pricePerToken": 100,
    "tokensSold": 5000,
    "fundsRaised": 500000,
    "property": {
      "title": "Luxury Apartment Complex",
      "location": "New York, NY",
      "propertyType": "residential"
    }
  }
}
```

### Investments

#### POST /api/investments
- Create new investment
- Authentication required

**Request Body:**
```json
{
  "propertyTokenId": "token-id",
  "amount": 5000,
  "tokenAmount": 50
}
```

#### GET /api/investments/me
- Get current user's investments
- Authentication required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "investment-id",
      "propertyTokenId": "token-id",
      "amount": 5000,
      "tokenAmount": 50,
      "status": "active",
      "createdAt": "2024-01-01T00:00:00Z",
      "property": {
        "title": "Luxury Apartment Complex",
        "location": "New York, NY"
      }
    }
  ]
}
```

### Transactions

#### POST /api/transactions
- Record a transaction (buy, sell, transfer)
- Authentication required

**Request Body:**
```json
{
  "propertyTokenId": "token-id",
  "type": "buy",
  "amount": 1000,
  "tokenAmount": 10,
  "pricePerToken": 100
}
```

### Order Book

#### GET /api/order-book
- Get order book entries
- Optional authentication (public data)

**Query Parameters:**
- `propertyTokenId`: Filter by property token
- `type`: Filter by order type (buy, sell)
- `status`: Filter by status (open, filled, cancelled)

#### POST /api/order-book
- Create new order
- Authentication required

**Request Body:**
```json
{
  "propertyTokenId": "token-id",
  "type": "buy",
  "pricePerToken": 95,
  "tokenAmount": 10,
  "totalAmount": 950
}
```

### Dividends

#### GET /api/dividends
- Get dividend records
- Optional authentication (public data)

**Query Parameters:**
- `propertyId`: Filter by property
- `status`: Filter by status (pending, paid, cancelled)

#### POST /api/dividends
- Create dividend distribution (Admin only)
- Authentication + Admin role required

**Request Body:**
```json
{
  "propertyId": "property-id",
  "amount": 10000,
  "perTokenAmount": 1,
  "paymentDate": "2024-02-01T00:00:00Z"
}
```

### Dividend Payments

#### GET /api/dividend-payments
- Get dividend payment records
- Authentication + Admin role required

**Query Parameters:**
- `dividendId`: Filter by dividend
- `userId`: Filter by user
- `status`: Filter by status (pending, paid, failed)

#### POST /api/dividend-payments
- Process dividend payments (Admin only)
- Authentication + Admin role required

**Request Body:**
```json
{
  "dividendId": "dividend-id"
}
```

#### GET /api/dividend-payments/me
- Get current user's dividend payments
- Authentication required

## Error Responses

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

### Common HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `429`: Too Many Requests (rate limit exceeded)
- `500`: Internal Server Error

## Rate Limit Headers

Successful responses include rate limit information:

- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Reset time in ISO format

## Security Notes

1. All financial data is validated server-side
2. User authentication is required for sensitive operations
3. Admin operations require explicit admin role
4. Rate limiting prevents abuse
5. Input validation prevents injection attacks
6. All monetary values are stored and processed with proper precision