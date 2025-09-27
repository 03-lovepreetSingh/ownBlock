import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "../../../lib/auth";
import { db } from "../../../lib/db";
import {
  dividendPayments,
  dividends,
  properties,
  investments,
  propertyTokens,
} from "../../../db/schema";
import { eq, desc } from "drizzle-orm";
import { successResponse, errorResponse } from "../../../lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dividendId = searchParams.get("dividendId");
    const userId = searchParams.get("userId");

    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = db
      .select({
        id: dividendPayments.id,
        dividendId: dividendPayments.dividendId,
        userId: dividendPayments.userId,
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
      .leftJoin(
        propertyTokens,
        eq(dividends.propertyTokenId, propertyTokens.id)
      )
      .leftJoin(properties, eq(propertyTokens.propertyId, properties.id));

    // Apply filters
    if (dividendId) {
      query = query.where(eq(dividendPayments.dividendId, dividendId)) as any;
    }

    if (userId) {
      query = query.where(eq(dividendPayments.userId, userId)) as any;
    }

    const payments = await query
      .orderBy(desc(dividendPayments.id))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(successResponse(payments));
  } catch (error) {
    console.error("Error fetching dividend payments:", error);
    return NextResponse.json(
      errorResponse("Failed to fetch dividend payments"),
      { status: 500 }
    );
  }
}

const processDividendPaymentSchema = z.object({
  dividendId: z.string().uuid("Dividend ID must be a valid UUID"),
});

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const validatedData = processDividendPaymentSchema.parse(body);

    // Get all investments for this property with their token holdings
    const investorHoldings = await db
      .select({
        userId: investments.userId,
        investmentId: investments.id,
        tokenAmount: investments.tokenAmount,
      })
      .from(investments)
      .where(eq(investments.status, "active"));

    // Create dividend payments for each investment
    const createdPayments = [];

    for (const holding of investorHoldings) {
      if (holding.tokenAmount > 0) {
        const paymentAmount = holding.tokenAmount * 0.1; // Example: $0.10 per token

        const [payment] = await db
          .insert(dividendPayments)
          .values({
            dividendId: validatedData.dividendId,
            userId: holding.userId,
            investmentId: holding.investmentId,
            amount: paymentAmount.toString(),
          })
          .returning();

        createdPayments.push(payment);
      }
    }

    return NextResponse.json(
      successResponse(
        {
          payments: createdPayments,
          totalPayments: createdPayments.length,
        },
        "Dividend payments processed successfully"
      ),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(errorResponse("Validation error"), {
        status: 400,
      });
    }

    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json(
        errorResponse("Forbidden - Admin access required"),
        { status: 403 }
      );
    }

    console.error("Error processing dividend payments:", error);
    return NextResponse.json(
      errorResponse("Failed to process dividend payments"),
      { status: 500 }
    );
  }
}
