import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { contractAddress: string } }
) {
  try {
    const { contractAddress } = params;

    // Validate contract address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
      return NextResponse.json(
        { error: "Invalid contract address format" },
        { status: 400 }
      );
    }

    // Get property by contract address
    const property = await db
      .select()
      .from(properties)
      .where(eq(properties.contractAddress, contractAddress))
      .limit(1);

    if (property.length === 0) {
      return NextResponse.json(
        { error: "Token not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      token: property[0],
    });
  } catch (error) {
    console.error("Error fetching token details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}