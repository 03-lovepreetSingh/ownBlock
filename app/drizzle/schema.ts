import { pgTable, foreignKey, uuid, numeric, timestamp, varchar, text, unique, boolean, integer, json } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const dividends = pgTable("dividends", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	propertyTokenId: uuid("property_token_id").notNull(),
	amount: numeric({ precision: 19, scale:  2 }).notNull(),
	distributionDate: timestamp("distribution_date", { mode: 'string' }).notNull(),
	status: varchar({ length: 20 }).default('scheduled').notNull(),
	description: text(),
}, (table) => [
	foreignKey({
			columns: [table.propertyTokenId],
			foreignColumns: [propertyTokens.id],
			name: "dividends_property_token_id_property_tokens_id_fk"
		}),
]);

export const dividendPayments = pgTable("dividend_payments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	dividendId: uuid("dividend_id").notNull(),
	userId: uuid("user_id").notNull(),
	investmentId: uuid("investment_id").notNull(),
	amount: numeric({ precision: 19, scale:  2 }).notNull(),
	paidAt: timestamp("paid_at", { mode: 'string' }),
	txHash: varchar("tx_hash", { length: 66 }),
}, (table) => [
	foreignKey({
			columns: [table.dividendId],
			foreignColumns: [dividends.id],
			name: "dividend_payments_dividend_id_dividends_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "dividend_payments_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.investmentId],
			foreignColumns: [investments.id],
			name: "dividend_payments_investment_id_investments_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	address: varchar({ length: 42 }).notNull(),
	email: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	isAdmin: boolean("is_admin").default(false),
}, (table) => [
	unique("users_address_unique").on(table.address),
]);

export const investments = pgTable("investments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	propertyTokenId: uuid("property_token_id").notNull(),
	tokenAmount: integer("token_amount").notNull(),
	investmentAmount: numeric("investment_amount", { precision: 19, scale:  2 }).notNull(),
	purchaseDate: timestamp("purchase_date", { mode: 'string' }).defaultNow().notNull(),
	status: varchar({ length: 20 }).default('active').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "investments_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.propertyTokenId],
			foreignColumns: [propertyTokens.id],
			name: "investments_property_token_id_property_tokens_id_fk"
		}),
]);

export const propertyTokens = pgTable("property_tokens", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	propertyId: uuid("property_id").notNull(),
	tokenSymbol: varchar("token_symbol", { length: 20 }).notNull(),
	totalSupply: integer("total_supply").notNull(),
	availableSupply: integer("available_supply").notNull(),
	tokenPrice: numeric("token_price", { precision: 19, scale:  2 }).notNull(),
	minInvestment: integer("min_investment").notNull(),
	contractAddress: varchar("contract_address", { length: 42 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	fundingProgress: numeric("funding_progress", { precision: 5, scale:  2 }).default('0'),
	tokenStandard: varchar("token_standard", { length: 20 }).default('ERC-3643'),
}, (table) => [
	foreignKey({
			columns: [table.propertyId],
			foreignColumns: [properties.id],
			name: "property_tokens_property_id_properties_id_fk"
		}).onDelete("cascade"),
]);

export const kycRecords = pgTable("kyc_records", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	status: varchar({ length: 20 }).default('pending').notNull(),
	firstName: varchar("first_name", { length: 100 }),
	lastName: varchar("last_name", { length: 100 }),
	dateOfBirth: timestamp("date_of_birth", { mode: 'string' }),
	nationality: varchar({ length: 100 }),
	documentType: varchar("document_type", { length: 50 }),
	documentId: varchar("document_id", { length: 100 }),
	documentUrl: text("document_url"),
	selfieUrl: text("selfie_url"),
	submittedAt: timestamp("submitted_at", { mode: 'string' }),
	verifiedAt: timestamp("verified_at", { mode: 'string' }),
	rejectionReason: text("rejection_reason"),
	notes: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "kyc_records_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const orderBook = pgTable("order_book", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	propertyTokenId: uuid("property_token_id").notNull(),
	userId: uuid("user_id").notNull(),
	type: varchar({ length: 10 }).notNull(),
	price: numeric({ precision: 19, scale:  2 }).notNull(),
	tokenAmount: integer("token_amount").notNull(),
	filledAmount: integer("filled_amount").default(0),
	status: varchar({ length: 20 }).default('open').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.propertyTokenId],
			foreignColumns: [propertyTokens.id],
			name: "order_book_property_token_id_property_tokens_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "order_book_user_id_users_id_fk"
		}),
]);

export const properties = pgTable("properties", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	location: varchar({ length: 255 }).notNull(),
	valuation: numeric({ precision: 19, scale:  2 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	features: json(),
	images: json(),
	status: varchar({ length: 20 }).default('draft').notNull(),
	createdById: uuid("created_by_id"),
	yearBuilt: integer("year_built"),
	squareFootage: integer("square_footage"),
	occupancyRate: numeric("occupancy_rate", { precision: 5, scale:  2 }),
	projectedAnnualReturn: numeric("projected_annual_return", { precision: 5, scale:  2 }),
	managementFee: numeric("management_fee", { precision: 5, scale:  2 }),
	dividendFrequency: varchar("dividend_frequency", { length: 20 }),
	propertyType: varchar("property_type", { length: 50 }),
	address: json(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "properties_created_by_id_users_id_fk"
		}),
]);

export const transactions = pgTable("transactions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	propertyTokenId: uuid("property_token_id").notNull(),
	fromAddress: varchar("from_address", { length: 42 }).notNull(),
	toAddress: varchar("to_address", { length: 42 }).notNull(),
	tokenAmount: integer("token_amount").notNull(),
	price: numeric({ precision: 19, scale:  2 }).notNull(),
	totalAmount: numeric("total_amount", { precision: 19, scale:  2 }).notNull(),
	timestamp: timestamp({ mode: 'string' }).defaultNow().notNull(),
	txHash: varchar("tx_hash", { length: 66 }),
	blockNumber: integer("block_number"),
	type: varchar({ length: 20 }).notNull(),
	status: varchar({ length: 20 }).default('pending').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.propertyTokenId],
			foreignColumns: [propertyTokens.id],
			name: "transactions_property_token_id_property_tokens_id_fk"
		}),
	unique("transactions_tx_hash_unique").on(table.txHash),
]);
