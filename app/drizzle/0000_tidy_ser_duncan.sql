CREATE TABLE "dividend_payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dividend_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"investment_id" uuid NOT NULL,
	"amount" numeric(19, 2) NOT NULL,
	"paid_at" timestamp,
	"tx_hash" varchar(66)
);
--> statement-breakpoint
CREATE TABLE "dividends" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_token_id" uuid NOT NULL,
	"amount" numeric(19, 2) NOT NULL,
	"distribution_date" timestamp NOT NULL,
	"status" varchar(20) DEFAULT 'scheduled' NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "investments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"property_token_id" uuid NOT NULL,
	"token_amount" integer NOT NULL,
	"investment_amount" numeric(19, 2) NOT NULL,
	"purchase_date" timestamp DEFAULT now() NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kyc_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"date_of_birth" timestamp,
	"nationality" varchar(100),
	"document_type" varchar(50),
	"document_id" varchar(100),
	"document_url" text,
	"selfie_url" text,
	"submitted_at" timestamp,
	"verified_at" timestamp,
	"rejection_reason" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "order_book" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_token_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(10) NOT NULL,
	"price" numeric(19, 2) NOT NULL,
	"token_amount" integer NOT NULL,
	"filled_amount" integer DEFAULT 0,
	"status" varchar(20) DEFAULT 'open' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"location" varchar(255) NOT NULL,
	"valuation" numeric(19, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"features" json,
	"images" json,
	"status" varchar(20) DEFAULT 'draft' NOT NULL,
	"created_by_id" uuid,
	"year_built" integer,
	"square_footage" integer,
	"occupancy_rate" numeric(5, 2),
	"projected_annual_return" numeric(5, 2),
	"management_fee" numeric(5, 2),
	"dividend_frequency" varchar(20),
	"property_type" varchar(50),
	"address" json
);
--> statement-breakpoint
CREATE TABLE "property_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"token_symbol" varchar(20) NOT NULL,
	"total_supply" integer NOT NULL,
	"available_supply" integer NOT NULL,
	"token_price" numeric(19, 2) NOT NULL,
	"min_investment" integer NOT NULL,
	"contract_address" varchar(42),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"funding_progress" numeric(5, 2) DEFAULT '0',
	"token_standard" varchar(20) DEFAULT 'ERC-3643'
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_token_id" uuid NOT NULL,
	"from_address" varchar(42) NOT NULL,
	"to_address" varchar(42) NOT NULL,
	"token_amount" integer NOT NULL,
	"price" numeric(19, 2) NOT NULL,
	"total_amount" numeric(19, 2) NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"tx_hash" varchar(66),
	"block_number" integer,
	"type" varchar(20) NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	CONSTRAINT "transactions_tx_hash_unique" UNIQUE("tx_hash")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"address" varchar(42) NOT NULL,
	"email" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_admin" boolean DEFAULT false,
	CONSTRAINT "users_address_unique" UNIQUE("address")
);
--> statement-breakpoint
ALTER TABLE "dividend_payments" ADD CONSTRAINT "dividend_payments_dividend_id_dividends_id_fk" FOREIGN KEY ("dividend_id") REFERENCES "public"."dividends"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dividend_payments" ADD CONSTRAINT "dividend_payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dividend_payments" ADD CONSTRAINT "dividend_payments_investment_id_investments_id_fk" FOREIGN KEY ("investment_id") REFERENCES "public"."investments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dividends" ADD CONSTRAINT "dividends_property_token_id_property_tokens_id_fk" FOREIGN KEY ("property_token_id") REFERENCES "public"."property_tokens"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "investments" ADD CONSTRAINT "investments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "investments" ADD CONSTRAINT "investments_property_token_id_property_tokens_id_fk" FOREIGN KEY ("property_token_id") REFERENCES "public"."property_tokens"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kyc_records" ADD CONSTRAINT "kyc_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_book" ADD CONSTRAINT "order_book_property_token_id_property_tokens_id_fk" FOREIGN KEY ("property_token_id") REFERENCES "public"."property_tokens"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_book" ADD CONSTRAINT "order_book_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_tokens" ADD CONSTRAINT "property_tokens_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_property_token_id_property_tokens_id_fk" FOREIGN KEY ("property_token_id") REFERENCES "public"."property_tokens"("id") ON DELETE no action ON UPDATE no action;