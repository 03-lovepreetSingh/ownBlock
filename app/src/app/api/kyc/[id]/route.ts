import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { kycRecords } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { successResponse, errorResponse } from "@/lib/api-response";

const updateKycSchema = z.object({
  status: z.enum(["verified", "rejected"]),
  rejectionReason: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const { id } = params;
    const body = await request.json();
    const validatedData = updateKycSchema.parse(body);

    // Check if KYC record exists
    const [existingKyc] = await db
      .select()
      .from(kycRecords)
      .where(eq(kycRecords.id, id))
      .limit(1);

    if (!existingKyc) {
      return NextResponse.json(errorResponse("KYC record not found"), {
        status: 404,
      });
    }

    // Update KYC record
    const [updatedKyc] = await db
      .update(kycRecords)
      .set({
        status: validatedData.status,
        rejectionReason: validatedData.rejectionReason || null,
        verifiedAt: validatedData.status === "verified" ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(kycRecords.id, id))
      .returning();

    return NextResponse.json(
      successResponse(updatedKyc, "KYC status updated successfully")
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        errorResponse("Validation error", error.errors),
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

    console.error("Error updating KYC:", error);
    return NextResponse.json(errorResponse("Failed to update KYC status"), {
      status: 500,
    });
  }
}
