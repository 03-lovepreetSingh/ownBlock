import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/db/schema";
import { eq, isNotNull } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Get all tokenized properties (those with contract addresses)
    const tokenizedProperties = await db
      .select({
        id: properties.id,
        title: properties.title,
        description: properties.description,
        location: properties.location,
        propertyType: properties.propertyType,
        valuation: properties.valuation,
        images: properties.images,
        contractAddress: properties.contractAddress,
        deploymentTxHash: properties.deploymentTxHash,
        isTokenized: properties.isTokenized,
        createdAt: properties.createdAt,
        updatedAt: properties.updatedAt,
      })
      .from(properties)
      .where(isNotNull(properties.contractAddress))
      .limit(limit)
      .offset(offset)
      .orderBy(
        sortOrder === "desc" 
          ? db.desc(properties[sortBy as keyof typeof properties] || properties.createdAt)
          : db.asc(properties[sortBy as keyof typeof properties] || properties.createdAt)
      );

    // Get total count for pagination
    const totalCount = await db
      .select({ count: db.count() })
      .from(properties)
      .where(isNotNull(properties.contractAddress));

    return NextResponse.json({
      tokens: tokenizedProperties,
      pagination: {
        total: totalCount[0].count,
        limit,
        offset,
        hasMore: offset + limit < totalCount[0].count,
      },
    });
  } catch (error) {
    console.error("Error fetching marketplace tokens:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}