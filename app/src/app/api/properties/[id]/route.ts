import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { properties, propertyTokens } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { successResponse, errorResponse } from "../../../../lib/api-response";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get property with associated token details
    const [property] = await db
      .select({
        id: properties.id,
        title: properties.title,
        description: properties.description,
        location: properties.location,
        propertyType: properties.propertyType,
        valuation: properties.valuation,
        images: properties.images,
        features: properties.features,
        yearBuilt: properties.yearBuilt,
        squareFootage: properties.squareFootage,
        occupancyRate: properties.occupancyRate,
        projectedAnnualReturn: properties.projectedAnnualReturn,
        managementFee: properties.managementFee,
        dividendFrequency: properties.dividendFrequency,
        address: properties.address,
        status: properties.status,
        createdAt: properties.createdAt,
        updatedAt: properties.updatedAt,
        // Token information
        tokenId: propertyTokens.id,
        tokenSymbol: propertyTokens.tokenSymbol,
        totalSupply: propertyTokens.totalSupply,
        availableSupply: propertyTokens.availableSupply,
        tokenPrice: propertyTokens.tokenPrice,
        minInvestment: propertyTokens.minInvestment,
        contractAddress: propertyTokens.contractAddress,
        fundingProgress: propertyTokens.fundingProgress,
        tokenStandard: propertyTokens.tokenStandard,
      })
      .from(properties)
      .leftJoin(propertyTokens, eq(properties.id, propertyTokens.propertyId))
      .where(eq(properties.id, id))
      .limit(1);

    if (!property) {
      return NextResponse.json(errorResponse("Property not found"), {
        status: 404,
      });
    }

    return NextResponse.json(successResponse(property));
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(errorResponse("Failed to fetch property"), {
      status: 500,
    });
  }
}