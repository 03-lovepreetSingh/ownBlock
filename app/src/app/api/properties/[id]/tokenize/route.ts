import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const tokenizeSchema = z.object({
  contractAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid contract address"),
  deploymentTxHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/, "Invalid transaction hash"),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = tokenizeSchema.parse(body);

    // Update property with contract information
    const updatedProperty = await db
      .update(properties)
      .set({
        contractAddress: validatedData.contractAddress,
        deploymentTxHash: validatedData.deploymentTxHash,
        isTokenized: true,
        updatedAt: new Date(),
      })
      .where(eq(properties.id, params.id))
      .returning();

    if (updatedProperty.length === 0) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Property tokenization completed successfully",
      property: updatedProperty[0],
    });
  } catch (error) {
    console.error("Error updating property tokenization:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}