import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { investments, propertyTokens, properties } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    // Get user's investments with property details
    const userInvestments = await db
      .select({
        id: investments.id,
        investmentAmount: investments.investmentAmount,
        tokenAmount: investments.tokenAmount,
        status: investments.status,
        purchaseDate: investments.purchaseDate,
        propertyTokenId: investments.propertyTokenId,
        propertyTokenSymbol: propertyTokens.tokenSymbol,
        propertyTokenPrice: propertyTokens.tokenPrice,
        propertyTitle: properties.title,
        propertyDescription: properties.description,
        propertyLocation: properties.location,
        propertyType: properties.propertyType,
        propertyImages: properties.images,
      })
      .from(investments)
      .leftJoin(
        propertyTokens,
        eq(investments.propertyTokenId, propertyTokens.id)
      )
      .leftJoin(properties, eq(propertyTokens.propertyId, properties.id))
      .where(eq(investments.userId, user.id))
      .orderBy(investments.purchaseDate);

    return NextResponse.json(successResponse(userInvestments));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(unauthorizedResponse(), { status: 401 });
    }

    console.error("Error fetching user investments:", error);
    return NextResponse.json(errorResponse("Failed to fetch investments"), {
      status: 500,
    });
  }
}
