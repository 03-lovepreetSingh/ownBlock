import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  dividendPayments,
  dividends,
  properties,
  propertyTokens,
} from "../../../../db/schema";
import { eq, desc } from "drizzle-orm";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = db
      .select({
        id: dividendPayments.id,
        dividendId: dividendPayments.dividendId,
        investmentId: dividendPayments.investmentId,
        amount: dividendPayments.amount,
        paidAt: dividendPayments.paidAt,
        txHash: dividendPayments.txHash,
        dividend: {
          id: dividends.id,
          propertyTokenId: dividends.propertyTokenId,
          amount: dividends.amount,
          distributionDate: dividends.distributionDate,
          status: dividends.status,
          description: dividends.description,
        },
        property: {
          id: properties.id,
          title: properties.title,
        },
      })
      .from(dividendPayments)
      .leftJoin(dividends, eq(dividendPayments.dividendId, dividends.id))
      .leftJoin(propertyTokens, eq(dividends.propertyTokenId, propertyTokens.id))
      .leftJoin(properties, eq(propertyTokens.propertyId, properties.id))
      .where(eq(dividendPayments.userId, user.id));

    // Apply ordering
    query = query.orderBy(desc(dividendPayments.paidAt)) as any;

    const payments = await query
      .limit(limit)
      .offset(offset);

    return NextResponse.json(successResponse(payments));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(errorResponse("Unauthorized"), { status: 401 });
    }

    console.error("Error fetching user dividend payments:", error);
    return NextResponse.json(
      errorResponse("Failed to fetch dividend payments"),
      { status: 500 }
    );
  }
}
