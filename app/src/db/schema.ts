import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  json,
  uuid,
  primaryKey,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// NextAuth.js required tables
export const account = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const session = pgTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationToken = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// Users table (updated for NextAuth compatibility)
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  address: varchar("address", { length: 42 }).unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isAdmin: boolean("is_admin").default(false),
});
// KYC table
export const kycRecords = pgTable("kyc_records", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, verified, rejected
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  dateOfBirth: timestamp("date_of_birth"),
  nationality: varchar("nationality", { length: 100 }),
  documentType: varchar("document_type", { length: 50 }),
  documentId: varchar("document_id", { length: 100 }),
  documentUrl: text("document_url"),
  selfieUrl: text("selfie_url"),
  submittedAt: timestamp("submitted_at"),
  verifiedAt: timestamp("verified_at"),
  rejectionReason: text("rejection_reason"),
  notes: text("notes"),
});
// Properties table
export const properties = pgTable("properties", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 255 }).notNull(),
  valuation: decimal("valuation", { precision: 19, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  features: json("features").$type<string[]>(),
  images: json("images").$type<string[]>(),
  status: varchar("status", { length: 20 }).notNull().default("draft"), // draft, active, funded, closed
  createdById: uuid("created_by_id").references(() => users.id),
  yearBuilt: integer("year_built"),
  squareFootage: integer("square_footage"),
  occupancyRate: decimal("occupancy_rate", { precision: 5, scale: 2 }),
  projectedAnnualReturn: decimal("projected_annual_return", {
    precision: 5,
    scale: 2,
  }),
  managementFee: decimal("management_fee", { precision: 5, scale: 2 }),
  dividendFrequency: varchar("dividend_frequency", { length: 20 }),
  propertyType: varchar("property_type", { length: 50 }), // residential, commercial, industrial, etc.
  address: json("address").$type<{
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }>(),
  contractAddress: varchar("contract_address", { length: 42 }), // ERC-3643 token contract address
  deploymentTxHash: varchar("deployment_tx_hash", { length: 66 }), // Transaction hash of contract deployment
  isTokenized: boolean("is_tokenized").default(false), // Whether the property has been tokenized
});
// Property tokens
export const propertyTokens = pgTable("property_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  propertyId: uuid("property_id")
    .notNull()
    .references(() => properties.id, { onDelete: "cascade" }),
  tokenSymbol: varchar("token_symbol", { length: 20 }).notNull(),
  totalSupply: integer("total_supply").notNull(),
  availableSupply: integer("available_supply").notNull(),
  tokenPrice: decimal("token_price", { precision: 19, scale: 2 }).notNull(),
  minInvestment: integer("min_investment").notNull(),
  contractAddress: varchar("contract_address", { length: 42 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  fundingProgress: decimal("funding_progress", {
    precision: 5,
    scale: 2,
  }).default("0"),
  tokenAddress: varchar("token_address", { length: 42 }),
  tokenStandard: varchar("token_standard", { length: 20 }).default("ERC-3643"),
});
// Investments
export const investments = pgTable("investments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  propertyTokenId: uuid("property_token_id")
    .notNull()
    .references(() => propertyTokens.id),
  tokenAmount: integer("token_amount").notNull(),
  investmentAmount: decimal("investment_amount", {
    precision: 19,
    scale: 2,
  }).notNull(),
  purchaseDate: timestamp("purchase_date").defaultNow().notNull(),
  status: varchar("status", { length: 20 }).notNull().default("active"), // active, sold
});
// Token transactions
export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  propertyTokenId: uuid("property_token_id")
    .notNull()
    .references(() => propertyTokens.id),
  fromAddress: varchar("from_address", { length: 42 }).notNull(),
  toAddress: varchar("to_address", { length: 42 }).notNull(),
  tokenAmount: integer("token_amount").notNull(),
  price: decimal("price", { precision: 19, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 19, scale: 2 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  txHash: varchar("tx_hash", { length: 66 }).unique(),
  blockNumber: integer("block_number"),
  type: varchar("type", { length: 20 }).notNull(), // buy, sell, transfer
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, completed, failed, cancelled
});
// Order book
export const orderBook = pgTable("order_book", {
  id: uuid("id").defaultRandom().primaryKey(),
  propertyTokenId: uuid("property_token_id")
    .notNull()
    .references(() => propertyTokens.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  type: varchar("type", { length: 10 }).notNull(), // buy, sell
  price: decimal("price", { precision: 19, scale: 2 }).notNull(),
  tokenAmount: integer("token_amount").notNull(),
  filledAmount: integer("filled_amount").default(0),
  status: varchar("status", { length: 20 }).notNull().default("open"), // open, filled, cancelled
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
});
// Dividends
export const dividends = pgTable("dividends", {
  id: uuid("id").defaultRandom().primaryKey(),
  propertyTokenId: uuid("property_token_id")
    .notNull()
    .references(() => propertyTokens.id),
  amount: decimal("amount", { precision: 19, scale: 2 }).notNull(),
  distributionDate: timestamp("distribution_date").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("scheduled"), // scheduled, distributed
  description: text("description"),
});
// Dividend payments
export const dividendPayments = pgTable("dividend_payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  dividendId: uuid("dividend_id")
    .notNull()
    .references(() => dividends.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  investmentId: uuid("investment_id")
    .notNull()
    .references(() => investments.id),
  amount: decimal("amount", { precision: 19, scale: 2 }).notNull(),
  paidAt: timestamp("paid_at"),
  txHash: varchar("tx_hash", { length: 66 }),
});
// Relations
export const accountRelations = relations(account, ({ one }) => ({
  user: one(users, { fields: [account.userId], references: [users.id] }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(users, { fields: [session.userId], references: [users.id] }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
  kycRecord: many(kycRecords),
  investments: many(investments),
  orders: many(orderBook),
}));
export const kycRecordsRelations = relations(kycRecords, ({ one }) => ({
  user: one(users, {
    fields: [kycRecords.userId],
    references: [users.id],
  }),
}));
export const propertiesRelations = relations(properties, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [properties.createdById],
    references: [users.id],
  }),
  tokens: many(propertyTokens),
}));
export const propertyTokensRelations = relations(
  propertyTokens,
  ({ one, many }) => ({
    property: one(properties, {
      fields: [propertyTokens.propertyId],
      references: [properties.id],
    }),
    investments: many(investments),
    transactions: many(transactions),
    orders: many(orderBook),
    dividends: many(dividends),
  })
);
export const investmentsRelations = relations(investments, ({ one, many }) => ({
  user: one(users, {
    fields: [investments.userId],
    references: [users.id],
  }),
  propertyToken: one(propertyTokens, {
    fields: [investments.propertyTokenId],
    references: [propertyTokens.id],
  }),
  dividendPayments: many(dividendPayments),
}));
export const transactionsRelations = relations(transactions, ({ one }) => ({
  propertyToken: one(propertyTokens, {
    fields: [transactions.propertyTokenId],
    references: [propertyTokens.id],
  }),
}));
export const orderBookRelations = relations(orderBook, ({ one }) => ({
  user: one(users, {
    fields: [orderBook.userId],
    references: [users.id],
  }),
  propertyToken: one(propertyTokens, {
    fields: [orderBook.propertyTokenId],
    references: [propertyTokens.id],
  }),
}));
export const dividendsRelations = relations(dividends, ({ one, many }) => ({
  propertyToken: one(propertyTokens, {
    fields: [dividends.propertyTokenId],
    references: [propertyTokens.id],
  }),
  payments: many(dividendPayments),
}));
export const dividendPaymentsRelations = relations(
  dividendPayments,
  ({ one }) => ({
    dividend: one(dividends, {
      fields: [dividendPayments.dividendId],
      references: [dividends.id],
    }),
    user: one(users, {
      fields: [dividendPayments.userId],
      references: [users.id],
    }),
    investment: one(investments, {
      fields: [dividendPayments.investmentId],
      references: [investments.id],
    }),
  })
);
