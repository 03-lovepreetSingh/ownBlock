import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "../../../../lib/auth";
import { db } from "../../../../lib/db";
import { properties } from "../../../../db/schema";
import { successResponse, errorResponse } from "../../../../lib/api-response";

const createPropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  propertyType: z.enum(["residential", "commercial", "industrial", "retail"]),
  valuation: z.number().positive("Valuation must be positive"),
  images: z.array(z.string().url()).optional().default([]), // Make images optional for user properties
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

export async function POST(request: NextRequest) {
  try {
    // Only require authentication, not admin access
    const user = await requireAuth();

    const body = await request.json();
    const validatedData = createPropertySchema.parse(body);

    // Create property with "pending" status for user-created properties
    const [property] = await db
      .insert(properties)
      .values({
        ...validatedData,
        valuation: validatedData.valuation.toString(),
        occupancyRate: validatedData.occupancyRate?.toString(),
        projectedAnnualReturn: validatedData.projectedAnnualReturn?.toString(),
        managementFee: validatedData.managementFee?.toString(),
        status: "pending", // User-created properties start as pending
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
      error.message === "Unauthorized"
    ) {
      return NextResponse.json(
        errorResponse("Unauthorized: Please sign in"),
        { status: 401 }
      );
    }

    console.error("Error creating property:", error);
    return NextResponse.json(errorResponse("Failed to create property"), {
      status: 500,
    });
  }
}