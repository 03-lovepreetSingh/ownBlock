import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { investments, propertyTokens, properties } from "../../../db/schema";
import { eq, and } from "drizzle-orm";
import { successResponse, errorResponse } from "@/lib/api-response";

const createInvestmentSchema = z.object({
  propertyTokenId: z.string().uuid("Property token ID must be a valid UUID"),
  amount: z.number().positive("Investment amount must be positive"),
  tokenAmount: z.number().positive("Token amount must be positive"),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    const body = await request.json();
    const validatedData = createInvestmentSchema.parse(body);

    // Get property token details
    const [propertyToken] = await db
      .select()
      .from(propertyTokens)
      .where(eq(propertyTokens.id, validatedData.propertyTokenId))
      .limit(1);

    if (!propertyToken) {
      return NextResponse.json(errorResponse("Property token not found"), {
        status: 404,
      });
    }

    // Get property details
    const [property] = await db
      .select()
      .from(properties)
      .where(eq(properties.id, propertyToken.propertyId))
      .limit(1);

    if (!property) {
      return NextResponse.json(errorResponse("Property not found"), {
        status: 404,
      });
    }

    // Check if property is active
    if (property.status !== "active") {
      return NextResponse.json(
        errorResponse("Property is not available for investment"),
        { status: 400 }
      );
    }

    // Check minimum investment requirement
    if (validatedData.amount < property.minimumInvestment) {
      return NextResponse.json(
        errorResponse(
          `Minimum investment amount is ${property.minimumInvestment}`
        ),
        { status: 400 }
      );
    }

    // Check available supply
    if (validatedData.tokenAmount > propertyToken.availableSupply) {
      return NextResponse.json(errorResponse("Not enough tokens available"), {
        status: 400,
      });
    }

    // Create investment
    const [investment] = await db
      .insert(investments)
      .values({
        userId: user.id,
        propertyTokenId: validatedData.propertyTokenId,
        amount: validatedData.amount,
        tokenAmount: validatedData.tokenAmount,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Update property token available supply
    await db
      .update(propertyTokens)
      .set({
        availableSupply:
          propertyToken.availableSupply - validatedData.tokenAmount,
        updatedAt: new Date(),
      })
      .where(eq(propertyTokens.id, validatedData.propertyTokenId));

    return NextResponse.json(
      successResponse(investment, "Investment created successfully"),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        errorResponse("Validation error", error.errors),
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(errorResponse("Unauthorized"), { status: 401 });
    }

    console.error("Error creating investment:", error);
    return NextResponse.json(errorResponse("Failed to create investment"), {
      status: 500,
    });
  }
}
