import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "../../../lib/auth";
import { db } from "../../../lib/db";
import { transactions, propertyTokens } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { successResponse, errorResponse } from "../../../lib/api-response";

const createTransactionSchema = z.object({
  propertyTokenId: z.string().uuid("Property token ID must be a valid UUID"),
  type: z.enum(["buy", "sell", "transfer"]),
  amount: z.number().positive("Transaction amount must be positive"),
  tokenAmount: z.number().positive("Token amount must be positive"),
  fromAddress: z.string().optional(),
  toAddress: z.string().optional(),
  txHash: z.string().optional(),
  metadata: z.object({}).passthrough().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    const body = await request.json();
    const validatedData = createTransactionSchema.parse(body);

    // Verify property token exists
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

    // Create transaction
    const [transaction] = await db
      .insert(transactions)
      .values({
        propertyTokenId: validatedData.propertyTokenId,
        type: validatedData.type,
        tokenAmount: validatedData.tokenAmount,
        price: String(validatedData.amount), // Convert to string for decimal type
        totalAmount: String(validatedData.amount * validatedData.tokenAmount), // Convert to string for decimal type
        fromAddress: validatedData.fromAddress || "0x0000000000000000000000000000000000000000",
        toAddress: validatedData.toAddress || "0x0000000000000000000000000000000000000000",
        txHash: validatedData.txHash,
        status: "pending", // Default status
      })
      .returning();

    return NextResponse.json(
      successResponse(transaction, "Transaction recorded successfully"),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        errorResponse("Validation error", error.issues),
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(errorResponse("Unauthorized"), { status: 401 });
    }

    console.error("Error recording transaction:", error);
    return NextResponse.json(errorResponse("Failed to record transaction"), {
      status: 500,
    });
  }
}
