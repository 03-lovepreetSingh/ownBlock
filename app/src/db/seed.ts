import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  users,
  properties,
  propertyTokens,
  investments,
  transactions,
  orderBook,
  dividends,
  dividendPayments,
  kycRecords,
} from "./schema";

// Get database URL from command line argument or environment variable
const databaseUrl = process.argv[2] || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ Database URL is required. Usage: npx tsx seed.ts <DATABASE_URL>");
  process.exit(1);
}

// Create database connection
const pool = new Pool({ connectionString: databaseUrl });
const db = drizzle(pool);

const sampleUsers = [
  {
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    email: "alice@example.com",
    isAdmin: false,
  },
  {
    address: "0x8ba1f109551bD432803012645Hac189451b934",
    email: "bob@example.com", 
    isAdmin: false,
  },
  {
    address: "0x1234567890123456789012345678901234567890",
    email: "admin@ownblock.com",
    isAdmin: true,
  },
];

const sampleProperties = [
  {
    title: "Luxury Downtown Apartment Complex",
    description: "A premium 50-unit apartment complex in the heart of downtown, featuring modern amenities and high occupancy rates.",
    location: "Downtown Manhattan, NY",
    valuation: "5000000.00",
    features: ["Pool", "Gym", "Concierge", "Parking", "Rooftop Terrace"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    ],
    status: "active",
    yearBuilt: 2020,
    squareFootage: 75000,
    occupancyRate: "95.00",
    projectedAnnualReturn: "8.50",
    managementFee: "2.00",
    dividendFrequency: "quarterly",
    propertyType: "residential",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    }
  },
  {
    title: "Modern Office Building",
    description: "A state-of-the-art 20-story office building with premium tenants and long-term leases.",
    location: "Financial District, San Francisco",
    valuation: "12000000.00",
    features: ["High-speed elevators", "Conference facilities", "Parking garage", "Security system"],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
    ],
    status: "active",
    yearBuilt: 2018,
    squareFootage: 200000,
    occupancyRate: "88.00",
    projectedAnnualReturn: "7.25",
    managementFee: "1.75",
    dividendFrequency: "quarterly",
    propertyType: "commercial",
    address: {
      street: "456 Business Ave",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "USA"
    }
  },
  {
    title: "Suburban Shopping Center",
    description: "A thriving retail complex with anchor tenants and excellent foot traffic in a growing suburban area.",
    location: "Austin, Texas",
    valuation: "8500000.00",
    features: ["Anchor stores", "Food court", "Ample parking", "Public transit access"],
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
    ],
    status: "active",
    yearBuilt: 2015,
    squareFootage: 150000,
    occupancyRate: "92.00",
    projectedAnnualReturn: "6.75",
    managementFee: "2.25",
    dividendFrequency: "monthly",
    propertyType: "retail",
    address: {
      street: "789 Shopping Blvd",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      country: "USA"
    }
  }
];

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await db.delete(dividendPayments);
    await db.delete(dividends);
    await db.delete(orderBook);
    await db.delete(transactions);
    await db.delete(investments);
    await db.delete(propertyTokens);
    await db.delete(properties);
    await db.delete(kycRecords);
    await db.delete(users);

    // Insert users
    console.log("👥 Inserting users...");
    const insertedUsers = await db.insert(users).values(sampleUsers).returning();
    console.log(`✅ Inserted ${insertedUsers.length} users`);

    // Insert properties with created_by_id
    console.log("🏢 Inserting properties...");
    const propertiesWithCreator = sampleProperties.map((property: any, index: number) => ({
      ...property,
      createdById: insertedUsers[index % insertedUsers.length].id
    }));
    const insertedProperties = await db.insert(properties).values(propertiesWithCreator).returning();
    console.log(`✅ Inserted ${insertedProperties.length} properties`);

    // Insert property tokens
    console.log("🪙 Inserting property tokens...");
    const sampleTokens = insertedProperties.map((property: any, index: number) => ({
      propertyId: property.id,
      tokenSymbol: `PROP${index + 1}`,
      totalSupply: 100000,
      availableSupply: 75000,
      tokenPrice: (parseFloat(property.valuation) / 100000).toFixed(2),
      minInvestment: 100,
      contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      fundingProgress: "25.00",
      tokenStandard: "ERC-3643"
    }));
    const insertedTokens = await db.insert(propertyTokens).values(sampleTokens).returning();
    console.log(`✅ Inserted ${insertedTokens.length} property tokens`);

    // Insert sample investments
    console.log("💰 Inserting investments...");
    const sampleInvestments = [];
    for (let i = 0; i < insertedUsers.length; i++) {
      for (let j = 0; j < insertedTokens.length; j++) {
        if (Math.random() > 0.3) { // 70% chance of investment
          sampleInvestments.push({
            userId: insertedUsers[i].id,
            propertyTokenId: insertedTokens[j].id,
            tokenAmount: Math.floor(Math.random() * 1000) + 100,
            investmentAmount: (Math.random() * 10000 + 1000).toFixed(2),
            status: "active"
          });
        }
      }
    }
    const insertedInvestments = await db.insert(investments).values(sampleInvestments).returning();
    console.log(`✅ Inserted ${insertedInvestments.length} investments`);

    // Insert sample transactions
    console.log("📊 Inserting transactions...");
    const sampleTransactions = insertedTokens.map((token: any, index: number) => ({
      propertyTokenId: token.id,
      fromAddress: "0x0000000000000000000000000000000000000000",
      toAddress: insertedUsers[index % insertedUsers.length].address,
      tokenAmount: 500,
      price: token.tokenPrice,
      totalAmount: (500 * parseFloat(token.tokenPrice)).toFixed(2),
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
      type: "buy",
      status: "completed"
    }));
    const insertedTransactions = await db.insert(transactions).values(sampleTransactions).returning();
    console.log(`✅ Inserted ${insertedTransactions.length} transactions`);

    // Insert sample order book entries
    console.log("📋 Inserting order book entries...");
    const sampleOrders = [];
    for (let i = 0; i < insertedTokens.length; i++) {
      const token = insertedTokens[i];
      // Buy orders
      sampleOrders.push({
        propertyTokenId: token.id,
        userId: insertedUsers[i % insertedUsers.length].id,
        type: "buy",
        price: (parseFloat(token.tokenPrice) * 0.95).toFixed(2),
        tokenAmount: 200,
        filledAmount: 0,
        status: "open"
      });
      // Sell orders
      sampleOrders.push({
        propertyTokenId: token.id,
        userId: insertedUsers[(i + 1) % insertedUsers.length].id,
        type: "sell",
        price: (parseFloat(token.tokenPrice) * 1.05).toFixed(2),
        tokenAmount: 150,
        filledAmount: 0,
        status: "open"
      });
    }
    const insertedOrders = await db.insert(orderBook).values(sampleOrders).returning();
    console.log(`✅ Inserted ${insertedOrders.length} order book entries`);

    // Insert sample dividends
    console.log("💸 Inserting dividends...");
    const sampleDividends = insertedTokens.map((token: any) => ({
      propertyTokenId: token.id,
      amount: (Math.random() * 50000 + 10000).toFixed(2),
      distributionDate: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000), // Next 90 days
      status: "scheduled",
      description: "Quarterly dividend distribution"
    }));
    const insertedDividends = await db.insert(dividends).values(sampleDividends).returning();
    console.log(`✅ Inserted ${insertedDividends.length} dividends`);

    // Insert sample dividend payments
    console.log("💳 Inserting dividend payments...");
    const sampleDividendPayments = [];
    for (const dividend of insertedDividends) {
      for (const investment of insertedInvestments) {
        if (investment.propertyTokenId === dividend.propertyTokenId) {
          const paymentAmount = (parseFloat(dividend.amount) * investment.tokenAmount / 100000).toFixed(2);
          sampleDividendPayments.push({
            dividendId: dividend.id,
            userId: investment.userId,
            investmentId: investment.id,
            amount: paymentAmount,
            paidAt: new Date(),
            txHash: `0x${Math.random().toString(16).substr(2, 64)}`
          });
        }
      }
    }
    const insertedDividendPayments = await db.insert(dividendPayments).values(sampleDividendPayments).returning();
    console.log(`✅ Inserted ${insertedDividendPayments.length} dividend payments`);

    // Insert sample KYC records
    console.log("🆔 Inserting KYC records...");
    const sampleKycRecords = insertedUsers.map((user: any, index: number) => ({
      userId: user.id,
      status: index === 0 ? "verified" : index === 1 ? "pending" : "rejected",
      firstName: ["Alice", "Bob", "Admin"][index],
      lastName: ["Johnson", "Smith", "User"][index],
      dateOfBirth: new Date(1990 + index, index, 15),
      nationality: "US",
      documentType: "passport",
      documentId: `P${1000000 + index}`,
      documentUrl: `https://example.com/docs/${user.id}`,
      selfieUrl: `https://example.com/selfies/${user.id}`,
      submittedAt: new Date(),
      verifiedAt: index === 0 ? new Date() : null,
      rejectionReason: index === 2 ? "Document quality insufficient" : null,
      notes: `KYC record for ${user.email}`
    }));
    const insertedKycRecords = await db.insert(kycRecords).values(sampleKycRecords).returning();
    console.log(`✅ Inserted ${insertedKycRecords.length} KYC records`);

    console.log("🎉 Database seeding completed successfully!");
    console.log(`
📊 Summary:
- Users: ${insertedUsers.length}
- Properties: ${insertedProperties.length}
- Property Tokens: ${insertedTokens.length}
- Investments: ${insertedInvestments.length}
- Transactions: ${insertedTransactions.length}
- Orders: ${insertedOrders.length}
- Dividends: ${insertedDividends.length}
- Dividend Payments: ${insertedDividendPayments.length}
- KYC Records: ${insertedKycRecords.length}
    `);

    return {
      users: insertedUsers,
      properties: insertedProperties,
      tokens: insertedTokens,
      investments: insertedInvestments,
      transactions: insertedTransactions,
      orders: insertedOrders,
      dividends: insertedDividends,
      dividendPayments: insertedDividendPayments,
      kycRecords: insertedKycRecords
    };

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("✅ Seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    });
}