import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orderBook, propertyTokens, properties } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyTokenId = searchParams.get("propertyTokenId");
    const type = searchParams.get("type"); // 'buy' or 'sell'
    const status = searchParams.get("status"); // 'open', 'filled', 'cancelled'

    let query = db
      .select({
        id: orderBook.id,
        propertyTokenId: orderBook.propertyTokenId,
        userId: orderBook.userId,
        type: orderBook.type,
        price: orderBook.price,
        tokenAmount: orderBook.tokenAmount,
        filledAmount: orderBook.filledAmount,
        status: orderBook.status,
        createdAt: orderBook.createdAt,
        expiresAt: orderBook.expiresAt,
        property: {
          id: properties.id,
          name: properties.name,
        },
      })
      .from(orderBook)
      .leftJoin(
        propertyTokens,
        eq(orderBook.propertyTokenId, propertyTokens.id)
      )
      .leftJoin(properties, eq(propertyTokens.propertyId, properties.id));

    // Apply filters
    if (propertyTokenId) {
      query = query.where(
        eq(orderBook.propertyTokenId, propertyTokenId)
      ) as any;
    }

    if (type) {
      query = query.where(eq(orderBook.type, type)) as any;
    }

    if (status) {
      query = query.where(eq(orderBook.status, status)) as any;
    } else {
      // Default to open orders
      query = query.where(eq(orderBook.status, "open")) as any;
    }

    const orders = await query.orderBy(orderBook.createdAt);

    return NextResponse.json(successResponse(orders));
  } catch (error) {
    console.error("Error fetching order book:", error);
    return NextResponse.json(errorResponse("Failed to fetch order book"), {
      status: 500,
    });
  }
}

const createOrderSchema = z.object({
  propertyTokenId: z.string().uuid("Property token ID must be a valid UUID"),
  type: z.enum(["buy", "sell"]),
  pricePerToken: z.number().positive("Price per token must be positive"),
  tokenAmount: z.number().positive("Token amount must be positive"),
  totalAmount: z.number().positive("Total amount must be positive"),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);

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

    // For sell orders, verify user has enough tokens
    if (validatedData.type === "sell") {
      // This would require checking user's token balance
      // For now, we'll assume the validation happens elsewhere
    }

    // Create order
    const [order] = await db
      .insert(orderBook)
      .values({
        userId: user.id,
        ...validatedData,
        status: "open",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(
      successResponse(order, "Order created successfully"),
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

    console.error("Error creating order:", error);
    return NextResponse.json(errorResponse("Failed to create order"), {
      status: 500,
    });
  }
}
