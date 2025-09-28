import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "../../../../lib/db";
import { propertyTokens } from "../../../../db/schema";
import { successResponse, errorResponse } from "../../../../lib/api-response";

const createPropertyTokenSchema = z.object({
  propertyId: z.string().uuid("Invalid property ID"),
  tokenSymbol: z.string().min(1, "Token symbol is required"),
  totalSupply: z.number().int().positive("Total supply must be positive"),
  availableSupply: z.number().int().positive("Available supply must be positive"),
  tokenPrice: z.number().positive("Token price must be positive"),
  minInvestment: z.number().int().positive("Minimum investment must be positive"),
  contractAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid contract address"),
  tokenStandard: z.string().optional().default("ERC-20"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createPropertyTokenSchema.parse(body);

    // Create property token record
    const [propertyToken] = await db
      .insert(propertyTokens)
      .values({
        propertyId: validatedData.propertyId,
        tokenSymbol: validatedData.tokenSymbol,
        totalSupply: validatedData.totalSupply,
        availableSupply: validatedData.availableSupply,
        tokenPrice: validatedData.tokenPrice.toString(),
        minInvestment: validatedData.minInvestment,
        contractAddress: validatedData.contractAddress,
        tokenStandard: validatedData.tokenStandard,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(
      successResponse(propertyToken, "Property token created successfully"),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        errorResponse("Validation error", error.issues),
        { status: 400 }
      );
    }

    console.error("Error creating property token:", error);
    return NextResponse.json(errorResponse("Failed to create property token"), {
      status: 500,
    });
  }
}