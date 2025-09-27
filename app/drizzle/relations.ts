import { relations } from "drizzle-orm/relations";
import { propertyTokens, dividends, dividendPayments, users, investments, properties, kycRecords, orderBook, transactions } from "./schema";

export const dividendsRelations = relations(dividends, ({one, many}) => ({
	propertyToken: one(propertyTokens, {
		fields: [dividends.propertyTokenId],
		references: [propertyTokens.id]
	}),
	dividendPayments: many(dividendPayments),
}));

export const propertyTokensRelations = relations(propertyTokens, ({one, many}) => ({
	dividends: many(dividends),
	investments: many(investments),
	property: one(properties, {
		fields: [propertyTokens.propertyId],
		references: [properties.id]
	}),
	orderBooks: many(orderBook),
	transactions: many(transactions),
}));

export const dividendPaymentsRelations = relations(dividendPayments, ({one}) => ({
	dividend: one(dividends, {
		fields: [dividendPayments.dividendId],
		references: [dividends.id]
	}),
	user: one(users, {
		fields: [dividendPayments.userId],
		references: [users.id]
	}),
	investment: one(investments, {
		fields: [dividendPayments.investmentId],
		references: [investments.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	dividendPayments: many(dividendPayments),
	investments: many(investments),
	kycRecords: many(kycRecords),
	orderBooks: many(orderBook),
	properties: many(properties),
}));

export const investmentsRelations = relations(investments, ({one, many}) => ({
	dividendPayments: many(dividendPayments),
	user: one(users, {
		fields: [investments.userId],
		references: [users.id]
	}),
	propertyToken: one(propertyTokens, {
		fields: [investments.propertyTokenId],
		references: [propertyTokens.id]
	}),
}));

export const propertiesRelations = relations(properties, ({one, many}) => ({
	propertyTokens: many(propertyTokens),
	user: one(users, {
		fields: [properties.createdById],
		references: [users.id]
	}),
}));

export const kycRecordsRelations = relations(kycRecords, ({one}) => ({
	user: one(users, {
		fields: [kycRecords.userId],
		references: [users.id]
	}),
}));

export const orderBookRelations = relations(orderBook, ({one}) => ({
	propertyToken: one(propertyTokens, {
		fields: [orderBook.propertyTokenId],
		references: [propertyTokens.id]
	}),
	user: one(users, {
		fields: [orderBook.userId],
		references: [users.id]
	}),
}));

export const transactionsRelations = relations(transactions, ({one}) => ({
	propertyToken: one(propertyTokens, {
		fields: [transactions.propertyTokenId],
		references: [propertyTokens.id]
	}),
}));