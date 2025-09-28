import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { propertyTokens, properties } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { successResponse, errorResponse } from "../../../../lib/api-response";

const updateTokenAddressSchema = z.object({
  tokenAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid contract address"),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateTokenAddressSchema.parse(body);

    // Update property token with contract address
    const [updatedToken] = await db
      .update(propertyTokens)
      .set({
        contractAddress: validatedData.tokenAddress,
        updatedAt: new Date(),
      })
      .where(eq(propertyTokens.id, id))
      .returning();

    if (!updatedToken) {
      return NextResponse.json(errorResponse("Property token not found"), {
        status: 404,
      });
    }

    return NextResponse.json(
      successResponse(updatedToken, "Token address updated successfully")
    );
  } catch (error) {
    console.error("Error updating property token:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        errorResponse("Invalid request data", error.issues),
        { status: 400 }
      );
    }

    return NextResponse.json(errorResponse("Failed to update property token"), {
      status: 500,
    });
  }
}
