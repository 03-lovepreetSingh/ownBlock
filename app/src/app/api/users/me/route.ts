import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, kycRecords } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/api-response";

const updateUserSchema = z.object({
  address: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(unauthorizedResponse(), { status: 401 });
    }

    // Get user's KYC status
    const [kycRecord] = await db
      .select()
      .from(kycRecords)
      .where(eq(kycRecords.userId, user.id))
      .limit(1);

    const userWithKyc = {
      ...user,
      kycStatus: kycRecord?.status || "not_submitted",
      kycVerified: kycRecord?.status === "verified",
    };

    return NextResponse.json(successResponse(userWithKyc));
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(errorResponse("Failed to fetch user"), {
      status: 500,
    });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(unauthorizedResponse(), { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateUserSchema.parse(body);

    const [updatedUser] = await db
      .update(users)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
      .returning();

    return NextResponse.json(
      successResponse(updatedUser, "User updated successfully")
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        errorResponse("Validation error", error.issues),
        { status: 400 }
      );
    }

    console.error("Error updating user:", error);
    return NextResponse.json(errorResponse("Failed to update user"), {
      status: 500,
    });
  }
}
