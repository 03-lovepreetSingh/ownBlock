import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { propertyTokens, properties } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { successResponse, errorResponse } from "../../../../lib/api-response";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get property token with property details
    const [propertyToken] = await db
      .select({
        id: propertyTokens.id,
        propertyId: propertyTokens.propertyId,
        tokenSymbol: propertyTokens.tokenSymbol,
        totalSupply: propertyTokens.totalSupply,
        availableSupply: propertyTokens.availableSupply,
        tokenPrice: propertyTokens.tokenPrice,
        minInvestment: propertyTokens.minInvestment,
        contractAddress: propertyTokens.contractAddress,
        fundingProgress: propertyTokens.fundingProgress,
        tokenStandard: propertyTokens.tokenStandard,
        createdAt: propertyTokens.createdAt,
        updatedAt: propertyTokens.updatedAt,
        propertyTitle: properties.title,
        propertyDescription: properties.description,
        propertyLocation: properties.location,
        propertyType: properties.propertyType,
        propertyStatus: properties.status,
        propertyValuation: properties.valuation,
        propertyImages: properties.images,
        propertyFeatures: properties.features,
      })
      .from(propertyTokens)
      .leftJoin(properties, eq(propertyTokens.propertyId, properties.id))
      .where(eq(propertyTokens.id, id))
      .limit(1);

    if (!propertyToken) {
      return NextResponse.json(errorResponse("Property token not found"), {
        status: 404,
      });
    }

    return NextResponse.json(successResponse(propertyToken));
  } catch (error) {
    console.error("Error fetching property token:", error);
    return NextResponse.json(errorResponse("Failed to fetch property token"), {
      status: 500,
    });
  }
}
