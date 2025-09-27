import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "../../../lib/auth";
import { db } from "../../../lib/db";
import { properties } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { successResponse, errorResponse } from "../../../lib/api-response";

const createPropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  propertyType: z.enum(["residential", "commercial", "industrial", "retail"]),
  valuation: z.number().positive("Valuation must be positive"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  features: z.array(z.string()).optional(),
  yearBuilt: z.number().int().positive().optional(),
  squareFootage: z.number().int().positive().optional(),
  occupancyRate: z.number().min(0).max(100).optional(),
  projectedAnnualReturn: z.number().positive().optional(),
  managementFee: z.number().positive().optional(),
  dividendFrequency: z.enum(["monthly", "quarterly", "annually"]).optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    let query = db.select().from(properties);

    // Filter by status if provided
    if (status) {
      query = query.where(eq(properties.status, status)) as any;
    } else {
      // Default to active properties
      query = query.where(eq(properties.status, "active")) as any;
    }

    // Add pagination
    if (limit) {
      query = query.limit(parseInt(limit)) as any;
    }

    if (offset) {
      query = query.offset(parseInt(offset)) as any;
    }

    const propertyList = await query;

    return NextResponse.json(successResponse(propertyList));
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(errorResponse("Failed to fetch properties"), {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin();

    const body = await request.json();
    const validatedData = createPropertySchema.parse(body);

    // Create property
    const [property] = await db
      .insert(properties)
      .values({
        ...validatedData,
        valuation: validatedData.valuation.toString(),
        occupancyRate: validatedData.occupancyRate?.toString(),
        projectedAnnualReturn: validatedData.projectedAnnualReturn?.toString(),
        managementFee: validatedData.managementFee?.toString(),
        createdById: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(
      successResponse(property, "Property created successfully"),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        errorResponse("Validation error", error.issues),
        { status: 400 }
      );
    }

    if (
      error instanceof Error &&
      error.message === "Forbidden: Admin access required"
    ) {
      return NextResponse.json(
        errorResponse("Forbidden: Admin access required"),
        { status: 403 }
      );
    }

    console.error("Error creating property:", error);
    return NextResponse.json(errorResponse("Failed to create property"), {
      status: 500,
    });
  }
}
